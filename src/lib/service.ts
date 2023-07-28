import axios from "axios";
import type {
  HistoriStokBarang,
  StokBarang,
  TypeBarang,
  DetailTransactionParams,
} from "./types";
const ENDPOINT = "http://localhost:3005/api/monitor";

export async function getTypeBarang(): Promise<TypeBarang[]> {
  const {
    data: { status, data },
  } = await axios(`${ENDPOINT}/tipe-barang`);
  if (status === "OK") return data;
  console.error(data);
  throw new Error(data);
}

export async function getStockByType(type?: string): Promise<StokBarang[]> {
  if (type === undefined) return Promise.resolve([]);
  const params = new URLSearchParams({
    type,
  });
  const {
    data: { data, status },
  } = await axios.get(`${ENDPOINT}?${params.toString()}`);
  if (status === "OK") return data;
  console.error(data);
  throw new Error(data);
}

export async function getDetailTransaction(
  args?: DetailTransactionParams
): Promise<HistoriStokBarang[]> {
  if (args === undefined) return Promise.resolve([]);
  const {
    data: { data, status },
  } = await axios.post(ENDPOINT, args);
  if (status === "OK") return data;
  console.log(data);
  throw new Error(data);
}
