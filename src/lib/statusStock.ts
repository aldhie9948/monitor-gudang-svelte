import type { StatusStock } from "./types";

export default function getStatusStock(stok: number | string): StatusStock {
  const number = typeof stok === "number" ? stok : Number(stok);
  if (number <= 10) return -1;
  if (number > 10 && number <= 100) return 0;
  if (number > 100) return 1;
}
