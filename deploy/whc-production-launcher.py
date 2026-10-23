#!/bin/python3
"""Production-only CloudLinux launcher; never evaluate environment values in a shell."""
import json
import os
from pathlib import Path
import sys

APP_ROOT = "botix-production/releases/93673ec63eaf"
NODE = "/opt/alt/alt-nodejs24/root/usr/bin/node"


def runtime_environment(config, inherited):
    app = config[APP_ROOT]
    if str(app["nodejs_version"]).split(".")[0] != "24":
        raise ValueError("Unexpected runtime")
    values = app["env_vars"]
    if not isinstance(values, dict) or any(
        not isinstance(k, str) or not isinstance(v, str)
        or "\0" in k or "=" in k or "\0" in v
        for k, v in values.items()
    ):
        raise ValueError("Invalid environment")
    if values.get("SITE_ENV") != "production" or values.get("SITE_URL") != "https://botix.ca":
        raise ValueError("Production only")
    if values.get("INQUIRY_DELIVERY_ENABLED") != "false":
        raise ValueError("Delivery must remain disabled")
    if app["app_mode"] != "production":
        raise ValueError("Unexpected mode")
    env = dict(inherited)
    env.update(values)
    env["NODE_ENV"] = "production"
    return env


def main():
    try:
        config = json.loads((Path.home() / ".cl.selector/node-selector.json").read_text())
        env = runtime_environment(config, os.environ)
        os.execve(NODE, [NODE] + sys.argv[1:], env)
    except Exception:
        # Never include configuration, exception text or credentials in logs.
        print("BOTIX production launcher refused startup; check private configuration", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
