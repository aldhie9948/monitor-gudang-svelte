import type { StatusCode } from "./types";

export function getItemStatusCode(stok: number | string): StatusCode {
  const number = typeof stok === "number" ? stok : Number(stok);
  if (number <= 10) return -1;
  if (number > 10 && number <= 100) return 0;
  if (number > 100) return 1;
}
