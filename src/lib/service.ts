import axios from "axios";
import type { StokBarang, TypeBarang } from "./types";
const ENDPOINT = "http://localhost:3005/api/stok-barang";

export async function getTypeBarang(): Promise<TypeBarang[]> {
  const {
    data: { status, data },
  } = await axios(`${ENDPOINT}/tipe-barang`);
  if (status === "OK") return data;
  console.error(data);
  throw new Error(data);
}

export async function getStockByType(type?: string): Promise<StokBarang[]> {
  if (type === undefined) return [];
  const params = new URLSearchParams({
    type,
  });
  const {
    data: { data, status },
  } = await axios.get(`${ENDPOINT}/monitor?${params.toString()}`);
  if (status === "OK") return data;
  console.error(data);
  throw new Error(data);
}
