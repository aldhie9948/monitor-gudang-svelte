import axios from "axios";
import type {
  IHistoriStokBarang,
  IStokBarang,
  ITypeBarang,
  IDetailTransactionParams,
  IMaterialCust,
} from "./types";
const ENDPOINT =
  import.meta.env.MODE === "development"
    ? "http://localhost:3005/api/monitor"
    : "http://192.168.10.19:3005/api/monitor";

/**
 * Service Raw Material
 * */

export async function getTypeBarang(): Promise<ITypeBarang[]> {
  const {
    data: { status, data },
  } = await axios.get(`${ENDPOINT}/raw-material/tipe-barang`);
  if (status === "OK") return data;
  console.error(data);
  throw new Error(data);
}

export async function getRawMaterialStockByType(
  type?: string
): Promise<IStokBarang[]> {
  if (type === undefined) return Promise.resolve([]);
  const params = new URLSearchParams({
    type,
  });
  const {
    data: { data, status },
  } = await axios.get(`${ENDPOINT}/raw-material?${params.toString()}`);
  if (status === "OK") return data;
  console.error(data);
  throw new Error(data);
}

export async function getRawMaterialDetailTransaction(
  args?: IDetailTransactionParams
): Promise<IHistoriStokBarang[]> {
  if (args === undefined) return Promise.resolve([]);
  const {
    data: { data, status },
  } = await axios.post(ENDPOINT + "/raw-material", args);
  if (status === "OK") return data;
  console.error(data);
  return Promise.reject(data);
}

export async function getRawMaterialLatestTransaction(
  kode: string,
  limit: number
): Promise<IHistoriStokBarang[]> {
  const params = new URLSearchParams({
    kode,
    limit: String(limit),
  });
  const {
    data: { data, status },
  } = await axios.get(ENDPOINT + "/raw-material/terbaru?" + params.toString());
  if (status === "OK") return data;
  console.error(data);
  return Promise.reject(data);
}

/**
 * Service Material Customer
 * */

export async function getMaterialCustItems(): Promise<IMaterialCust[]> {
  try {
    const {
      data: { data, status },
    } = await (<
      Promise<{
        data: { data: IMaterialCust[]; status: string; record: number };
      }>
    >axios.get(ENDPOINT + "/material-cust"));
    if (status === "OK") return data;
    if (!Array.isArray(data)) throw new Error(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return Promise.reject([]);
    }
  }
}
