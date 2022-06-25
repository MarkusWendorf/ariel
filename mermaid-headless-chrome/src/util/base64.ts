export function stringToBase64(input: string) {
  return Buffer.from(input).toString("base64");
}

export function base64ToString(inputBase64: string) {
  return Buffer.from(inputBase64, "base64").toString("utf-8");
}