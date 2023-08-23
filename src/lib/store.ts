import type {
  IMaterialCust,
  IStokBarang,
  ITypeBarang,
  ItemsForSearch,
} from "@lib/types";
import { writable } from "svelte/store";
export const keywordSearch = writable<string>("");
export const categoryItems = writable<string[]>([
  "Raw Material",
  "Press",
  "Tooling",
  "WIP",
  "Finish Good",
  "Material Cust",
]);
export const selectedCategory = writable<string>("Raw Material");
export const typeBarang = writable<ITypeBarang[]>([]);
export const currentTypeBarang = writable<ITypeBarang>();
export const currentStockBarang = writable<Promise<IStokBarang[]>>(
  Promise.resolve([])
);
export const itemsForSearchForm = writable<ItemsForSearch>([]);
export const currentMaterialCust = writable<Promise<IMaterialCust[]>>(
  Promise.resolve([])
);
