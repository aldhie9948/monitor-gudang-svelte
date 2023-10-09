import axios, { AxiosError } from "axios";
import type {
  IDetailTransactionParams,
  IMaterialCustItem,
  IRawMaterialItem,
  IRawMaterialPartItems,
  IRawMaterialTransaction,
  IRawMaterialType,
} from "./types";
const ENDPOINT = import.meta.env.VITE_ENDPOINT;

function axiosErrorHandler(error: unknown) {
  let message = "";
  if (error instanceof AxiosError) {
    message = error.response?.data.error;
    console.log(message);
  }
  return message;
}

/**
 * Service Raw Material
 * */

export async function getRawMaterialTypes(): Promise<IRawMaterialType[]> {
  try {
    const { data } = await axios.get(`${ENDPOINT}/raw-material/items-type`);
    return data;
  } catch (err) {
    axiosErrorHandler(err);
    return [];
  }
}

export async function getRawMaterialItemsByType(
  type: string
): Promise<IRawMaterialItem[]> {
  try {
    const { data } = await axios.get(ENDPOINT + "/raw-material/" + type);
    return data;
  } catch (err) {
    axiosErrorHandler(err);
    return [];
  }
}

export async function getRawMaterialTransactions(
  args: IDetailTransactionParams
): Promise<IRawMaterialTransaction[]> {
  try {
    const { data } = await axios.post(ENDPOINT + "/raw-material", args);
    return data;
  } catch (error) {
    axiosErrorHandler(error);
    return [];
  }
}

export async function getRawMaterialLatestTransaction(
  code: string,
  limit: number
): Promise<IRawMaterialTransaction[]> {
  try {
    const params = new URLSearchParams({
      code,
      limit: String(limit),
    });
    const { data } = await axios.get(
      ENDPOINT + "/raw-material/latest?" + params.toString()
    );
    return data;
  } catch (err) {
    axiosErrorHandler(err);
    return [];
  }
}

/**
 * Service Material Customer
 * */

export async function getMaterialCustItems(): Promise<IMaterialCustItem[]> {
  try {
    const { data } = await axios.get(ENDPOINT + "/material-cust");
    return data;
  } catch (err) {
    axiosErrorHandler(err);
    return [];
  }
}

/**
 * Service Bom All Level 1
 * */

export async function getRawMaterialPartItems(
  id: string
): Promise<IRawMaterialPartItems[]> {
  try {
    const { data } = await axios.post(ENDPOINT + "/raw-material/part-items", {
      id,
    });
    return data;
  } catch (error) {
    axiosErrorHandler(error);
    return [];
  }
}
