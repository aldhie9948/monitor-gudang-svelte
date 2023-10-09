<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { IMaterialCustItem } from "@lib/types";

  export let items: IMaterialCustItem[];
  let item: IMaterialCustItem;
  $: if (items.length > 0) item = items[0];
</script>

<div
  class="bg-slate-900 p-4 rounded-lg subtle-shadow xl:w-full md:w-1/2 w-full"
>
  <div class="flex items-center gap-2">
    <Icon icon="mdi:information" width="1.5rem" class="text-blue-500" />
    <h1 class="font-bold">Information</h1>
  </div>
  <hr class="opacity-30 my-2" />
  <div class="my-5">
    <h1 class="font-bold 2xl:text-7xl text-6xl">
      {items?.length}
    </h1>
    <h2>Total Barang</h2>
  </div>
  <div class="flex items-center gap-2">
    <Icon icon="gg:details-more" width="1.5rem" class="text-blue-500" />
    <h1 class="font-bold">Detail</h1>
  </div>
  <hr class="opacity-30 my-2" />
  <table class="w-full">
    <tr>
      <td>Gudang</td>
      <td>:</td>
      <td>{item?.gudang}</td>
    </tr>
    <tr>
      <td>Kategori</td>
      <td>:</td>
      <td>{item?.kategori}</td>
    </tr>
    <tr>
      <td>Tipe Barang</td>
      <td>:</td>
      <td>{item?.tipe_barang}</td>
    </tr>
  </table>
</div>

<style>
  td {
    @apply py-0.5;
  }
</style>
