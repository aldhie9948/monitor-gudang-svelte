import axios from "axios";
import type {
  IHistoriStokBarang,
  IStokBarang,
  ITypeBarang,
  IDetailTransactionParams,
  IMaterialCust,
  IBomAllLevel1,
} from "./types";
const ENDPOINT = import.meta.env.VITE_ENDPOINT;

/**
 * Service Raw Material
 * */

export async function getTypeBarang(): Promise<ITypeBarang[]> {
  try {
    const {
      data: { status, data },
    } = await axios.get(`${ENDPOINT}/raw-material/tipe-barang`);
    if (status === "ERR") throw new Error(data);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return Promise.reject(err.message);
    }
  }
}

export async function getRawMaterialStockByType(
  type?: string
): Promise<IStokBarang[]> {
  try {
    if (type === undefined) throw new Error("Tipe barang tidak boleh kosong");
    const params = new URLSearchParams({
      type,
    });
    const {
      data: { data, status },
    } = await axios.get(`${ENDPOINT}/raw-material?${params.toString()}`);
    if (status === "ERR") throw new Error(data);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return Promise.reject(err.message);
    }
  }
}

export async function getRawMaterialDetailTransaction(
  args?: IDetailTransactionParams
): Promise<IHistoriStokBarang[]> {
  try {
    if (args === undefined) throw new Error("Invalid arguments");
    const {
      data: { data, status, record },
    } = await axios.post(ENDPOINT + "/raw-material", args);
    if (!Array.isArray(data) || status === "ERR") throw new Error(data);
    if (data.length === 0 && record === 0)
      throw new Error("Transaksi kosong atau tidak ditemukan");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return Promise.reject(error.message);
    }
  }
}

export async function getRawMaterialLatestTransaction(
  kode: string,
  limit: number
): Promise<IHistoriStokBarang[]> {
  try {
    const params = new URLSearchParams({
      kode,
      limit: String(limit),
    });
    const {
      data: { data, status },
    } = await axios.get(
      ENDPOINT + "/raw-material/terbaru?" + params.toString()
    );
    if (status === "Err") throw new Error(data);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return Promise.reject(err.message);
    }
  }
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
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return Promise.reject(err.message);
    }
  }
}

/**
 * Service Bom All Level 1
 * */

export async function getBomAllLevel1(kode: string): Promise<IBomAllLevel1[]> {
  try {
    const {
      data: { data, status, record },
    } = await (<
      Promise<{
        data: { data: IBomAllLevel1[]; status: string; record: number };
      }>
    >axios.post(ENDPOINT + "/bom-all-level-1", { kode_barang: kode }));
    if (data.length === 0 && record === 0)
      throw new Error("Data kosong atau tidak ditemukan");
    if (!Array.isArray(data) && status === "ERR") throw new Error(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return Promise.reject(error.message);
    }
  }
}
