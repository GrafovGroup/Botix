// Manual, gated worker. No scheduler, no startup/build import and no default send.
import { processReceipt, sendmailTransport } from "../receiver/mailbox";
const receipt = process.argv[2];
if (process.env.BOTIX_MAILBOX_SEND_AUTHORIZED !== "true")
  throw new Error(
    "Mailbox sending disabled; explicit owner authorization required",
  );
if (
  !process.env.RECEIVER_OUTBOX ||
  !process.env.RECEIVER_MAIL_STATE ||
  !receipt
)
  throw new Error("Private queue, state path and receipt required");
const result = await processReceipt({
  directory: process.env.RECEIVER_OUTBOX,
  stateDirectory: process.env.RECEIVER_MAIL_STATE,
  receipt,
  transport: sendmailTransport(),
  authorized: true,
});
console.log(JSON.stringify({ result })); // no customer data or receipt in logs
