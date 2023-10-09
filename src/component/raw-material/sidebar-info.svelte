<script lang="ts">
  import type { IRawMaterialItem, IRawMaterialType } from "@lib/types";
  import ItemsStatus from "./items-status.svelte";
  import LatestTransactions from "./latest-transactions.svelte";
  export let itemType: IRawMaterialType;
  export let items: IRawMaterialItem[];
</script>

<div class="xl:col-span-4">
  <div class="mb-3">
    <h1 class="text-3xl font-bold">{itemType?.nama}</h1>
    <div class="grid grid-cols-2 font-light">
      <h1>Kode : {itemType?.kode}</h1>
      <h1>Jenis : {itemType?.jenis}</h1>
    </div>
  </div>
  <div class="grid xl:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-2">
    <ItemsStatus {items} />
    <LatestTransactions {itemType} />
  </div>
</div>
