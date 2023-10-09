import { writable } from "svelte/store";
import type {
  IMaterialCustItem,
  IRawMaterialItem,
  IRawMaterialType,
} from "@lib/types";
export const categoryItems = writable<string[]>([
  "Raw Material",
  "Press",
  "Tooling",
  "WIP",
  "Finish Good",
  "Material Cust",
]);

// update
export const rawMaterialItems = writable<IRawMaterialItem[]>([]);
export const rawMaterialType = writable<IRawMaterialType>();
export const category = writable<string>();
export const materialCustItems = writable<IMaterialCustItem[]>([]);
