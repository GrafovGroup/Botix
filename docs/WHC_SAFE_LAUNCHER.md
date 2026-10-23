# WHC staging environment loader

## Failure and root cause

The owner completed both credential forms. Host authentication accepted the saved credential, but Next returned its 23-byte authentication challenge. The running process environment differed from the saved configuration, including its length. Restarting did not fix it.

Inspected WHC's `/usr/share/l.v.e-manager/utils/node_wrapper`: it sources the virtual environment, then evaluates the output of `set_env_vars.py`. That script prints values inside double-quoted shell export statements without escaping shell metacharacters. This can expand password contents. No credential values were printed or committed. Merely bypassing the wrapper without loading its environment produced a 503, so that intermediate configuration was replaced.

## Applied isolated fix

- Install `deploy/whc-node-launcher.py` as `~/botix-staging/whc-node-launcher.py`, mode 0700.
- Set staging document root `.htaccess` `PassengerNodejs` to `/home/nvfglyl5/botix-staging/whc-node-launcher.py`.
- The launcher reads only the exact staging application record from the owner's `.cl.selector/node-selector.json`, validates preview/origin/delivery/runtime settings, and calls `os.execve` with a literal environment. It does not invoke a shell, change the saved password or log configuration values.
- The process uses the existing `/opt/alt/alt-nodejs24/root/usr/bin/node`. It preserves inherited Passenger settings and command arguments. Existing `start.cjs` still performs release/runtime preflight.
- Public authentication/noindex/no-store and HTTPS rules remain intact. No production domain, mail, other app, vendor-wide file or release-artifact file was edited.
- Protected rollback config is `~/botix-staging/rollback/pre-direct-node.htaccess`, mode 0600; it contains private configuration and must never enter Git. Restoring it also restores the defective vendor launcher, so rollback is a stop/recovery action, not a healthy deployed state.

## Validation

`python3 -m unittest discover -s deploy -p 'test_*.py'`: 3 tests passed, covering literal shell-special characters, inherited settings and rejection of unsafe/missing staging configuration. `git diff --check` passed.

On WHC, authenticated `/en` returned 200 with noindex and private/no-store after this fix. Ran the unchanged `scripts/staging-acceptance.mjs` on WHC with credentials loaded privately from configuration, HTTPS validation enabled and `STAGING_TEST_AUTHORIZED=true`: 144 routes, GET-only, exit 0. Post-restart authenticated homepage check also returned 200; full graceful drain/concurrency/load and backup restore acceptance are not claimed.

## Maintenance and limitations

The launcher intentionally pins this staging root and Node major 24. A new release root/runtime requires an explicit reviewed update. cPanel Node Selector changes may regenerate `.htaccess` and overwrite PassengerNodejs; reapply the staging launcher path and rerun protected acceptance after any settings save. Do not blindly copy `.htaccess` output into diagnostics because it includes secrets.

Keep live inquiry delivery disabled. The in-app browser authentication error prevented visual acceptance; complete normal-browser desktop/mobile, keyboard, measured performance and operational checks before claiming full staging acceptance. Production remains separately unauthorized.
