import { publicPhone } from "@/lib/contact";
export function ContactPhone({ className }: { className?: string }) {
  return publicPhone ? (
    <a className={className} href={publicPhone.href}>
      {publicPhone.label} ↗
    </a>
  ) : null;
}
