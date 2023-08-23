<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { IMaterialCust } from "@lib/types";

  export let information: IMaterialCust[];
</script>

<div class="bg-slate-900 p-4 rounded-lg subtle-shadow">
  <div class="flex items-center gap-2">
    <Icon icon="mdi:information" width="1.5rem" class="text-blue-500" />
    <h1 class="font-bold">Information</h1>
  </div>
  <hr class="opacity-30 my-2" />
  <div class="my-5">
    <h1 class="font-bold 2xl:text-7xl text-6xl">
      {information?.length}
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
      <td>{information[0]?.gudang}</td>
    </tr>
    <tr>
      <td>Kategori</td>
      <td>:</td>
      <td>{information[0]?.kategori}</td>
    </tr>
    <tr>
      <td>Tipe Barang</td>
      <td>:</td>
      <td>{information[0]?.tipe_barang}</td>
    </tr>
  </table>
</div>

<style>
  td {
    @apply py-0.5;
  }
</style>
