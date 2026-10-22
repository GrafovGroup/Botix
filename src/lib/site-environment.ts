export function siteEnvironment(
  env: Record<string, string | undefined> = process.env,
) {
  if (env.SITE_ENV === "production") return "production";
  if (env.SITE_ENV === "preview" || env.NODE_ENV === "production")
    return "preview";
  return "development";
}
