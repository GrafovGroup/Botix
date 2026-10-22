// Public build-time settings: rebuild after owner verifies or changes the number.
export function verifiedPhone(verified?: string, value?: string) {
  if (verified !== "true" || !value || !/^\+[1-9]\d{7,14}$/.test(value))
    return null;
  return {
    href: `tel:${value}`,
    number: value,
    label: value === "+18336969996" ? "(833) 696-9996" : value,
  };
}
export const publicPhone = verifiedPhone(
  process.env.NEXT_PUBLIC_PHONE_VERIFIED,
  process.env.NEXT_PUBLIC_PHONE_NUMBER,
);
