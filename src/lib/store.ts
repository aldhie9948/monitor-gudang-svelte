import { writable } from "svelte/store";
import type { StokBarang, TypeBarang } from "./types";
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
export const typeBarang = writable<TypeBarang[]>([]);
export const currentTypeBarang = writable<TypeBarang>();
export const currentStockBarang = writable<StokBarang[]>([]);
