import { writable } from "svelte/store";
import type { IMaterialCust, IStokBarang, ITypeBarang } from "@lib/types";
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
export const currentStockBarang = writable<IStokBarang[]>([]);
export const itemsForSearchForm = writable<IStokBarang[] | IMaterialCust[]>([]);
export const currentMaterialCust = writable<IMaterialCust[]>([]);
