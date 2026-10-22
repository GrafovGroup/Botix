import { deliveryReadiness } from "../src/lib/delivery-config";
const result = deliveryReadiness({ ...process.env, NODE_ENV: "production" });
if (!result.ready) {
  console.error(`Production delivery blocked: ${result.missing.join(", ")}`);
  process.exitCode = 1;
} else
  console.log(
    "Configuration gates pass. Owner must retain evidence of actual receiver, privacy and edge-control verification; this command does not test them.",
  );
