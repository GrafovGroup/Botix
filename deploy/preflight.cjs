// Never include environment values in errors; this runs before opening a socket.
function validate(env, build) {
  const errors = [];
  if (!["preview", "production"].includes(env.SITE_ENV))
    errors.push("SITE_ENV must be explicit");
  let origin;
  try {
    const url = new URL(env.SITE_URL);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    )
      throw new Error();
    origin = url.origin;
  } catch {
    errors.push("SITE_URL must be an HTTPS origin");
  }
  if (origin !== build.siteUrl || env.SITE_ENV !== build.siteEnv)
    errors.push(
      "Build/runtime site configuration mismatch; rebuild for this environment",
    );
  if (
    env.SITE_ENV === "preview" &&
    (!env.PREVIEW_ACCESS_SECRET || env.PREVIEW_ACCESS_SECRET.length < 32)
  )
    errors.push("Preview requires a secret of at least 32 characters");
  if (env.INQUIRY_DELIVERY_ENABLED !== "false")
    errors.push("This deployment recipe requires delivery explicitly disabled");
  if (env.TRUST_PROXY !== "false")
    errors.push("This deployment recipe requires proxy trust disabled");
  if (
    !/^\d+$/.test(env.PORT || "") ||
    Number(env.PORT) < 1024 ||
    Number(env.PORT) > 65535
  )
    errors.push("PORT must be between 1024 and 65535");
  if (!["127.0.0.1", "0.0.0.0", "::1", "::"].includes(env.HOSTNAME))
    errors.push("Set an explicit supported bind address in HOSTNAME");
  if (env.NEXT_MANUAL_SIG_HANDLE)
    errors.push("Keep Next.js native signal handling enabled");
  return errors;
}
module.exports = { validate };
