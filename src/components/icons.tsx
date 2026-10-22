export function RobotIcon({ kind }: { kind: string }) {
  const paths: Record<string, string> = {
    service:
      "M32 15h36v20H32z M42 24h16 M25 45h50 M25 60h50 M25 75h50 M35 35v48m30-48v48 M28 83h44v7H28z",
    humanoid:
      "M35 12h30v27H35z M41 22h4m10 0h4 M30 48h40v31H30z M20 48v32m60-32v32 M40 79v15m20-15v15 M45 39v9m10-9v9",
    cleaning:
      "M22 52h56v29H22z M30 52V36h40v16 M40 36V24h20v12 M32 82v6m36-6v6 M32 63h36 M42 72h16",
    logistics:
      "M17 65h66v17H17z M27 37h46v28H27z M40 37v15h20V37 M28 82v8m44-8v8 M36 23h28 M50 14v17",
    industrial:
      "M23 86h55 M31 86V73h38v13 M40 73l-9-30 13-8 21 21-10 17 M31 43l14-23 12 8-13 18 M45 20l20-7 6 13-14 2 M71 20h12v15 M78 35h10",
    inspection:
      "M25 40h50v29H25z M38 51h24v10H38z M25 60L12 79v12 M75 60l13 19v12 M35 69l-4 20 M65 69l4 20 M50 40V25h15 M65 20v10",
  };
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[kind] || paths.humanoid} />
    </svg>
  );
}
export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
