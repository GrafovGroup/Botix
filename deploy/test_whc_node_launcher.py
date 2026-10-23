import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location("launcher", Path(__file__).with_name("whc-node-launcher.py"))
launcher = importlib.util.module_from_spec(spec)
spec.loader.exec_module(launcher)


class LauncherTests(unittest.TestCase):
    def config(self, **changes):
        values = {
            "SITE_ENV": "preview", "SITE_URL": "https://staging.botix.ca",
            "INQUIRY_DELIVERY_ENABLED": "false",
            "PREVIEW_ACCESS_SECRET": 'Synthetic-$HOME-$(false)-`false`-"quotes"-\\slashes',
        }
        values.update(changes)
        return {launcher.APP_ROOT: {"nodejs_version": "24.21.0", "app_mode": "production", "env_vars": values}}

    def test_preserves_shell_metacharacters_literally(self):
        config = self.config()
        inherited = {"PASSENGER_TEST": "retained"}
        actual = launcher.runtime_environment(config, inherited)
        self.assertEqual(actual["PREVIEW_ACCESS_SECRET"], config[launcher.APP_ROOT]["env_vars"]["PREVIEW_ACCESS_SECRET"])
        self.assertEqual(actual["PASSENGER_TEST"], "retained")
        self.assertNotIn("PREVIEW_ACCESS_SECRET", inherited)

    def test_rejects_non_staging_or_incomplete_settings(self):
        for key, value in [("SITE_ENV", "production"), ("SITE_URL", "https://botix.ca"),
                           ("INQUIRY_DELIVERY_ENABLED", "true"), ("PREVIEW_ACCESS_SECRET", "short")]:
            with self.subTest(key=key), self.assertRaises(ValueError):
                launcher.runtime_environment(self.config(**{key: value}), {})

    def test_rejects_wrong_runtime_and_invalid_environment(self):
        config = self.config()
        config[launcher.APP_ROOT]["nodejs_version"] = "22"
        with self.assertRaises(ValueError):
            launcher.runtime_environment(config, {})
        with self.assertRaises(ValueError):
            launcher.runtime_environment(self.config(BAD="embedded\0null"), {})


if __name__ == "__main__":
    unittest.main()
