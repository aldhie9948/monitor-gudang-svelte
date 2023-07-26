<script lang="ts">
  import type { StokBarang, StatusStock } from "../lib/types";

  export let stock: StokBarang;
  function statusStock(stok: number | string): StatusStock {
    const number = typeof stok === "number" ? stok : Number(stok);
    if (number < 10) return -1;
    if (number > 10 && number <= 100) return 0;
    if (number > 100) return 1;
  }
</script>

<div
  class="bg-slate-700 mb-2 rounded w-full py-2 px-4 cursor-pointer snap-start flex items-center gap-5"
>
  <div
    class="w-8 h-8 rounded-full animate-pulse ring-2"
    class:empty={statusStock(stock.stok) === -1}
    class:danger={statusStock(stock.stok) === 0}
    class:safe={statusStock(stock.stok) === 1}
  />
  <div>
    <h1 class="font-bold text-lg">{stock.nama_barang}</h1>
    <h2>Kode: {stock.kode_barang}</h2>
    <h2>Gudang: {stock.gudang}</h2>
  </div>
</div>

<style>
  .empty {
    @apply bg-red-500 ring-red-500;
  }
  .danger {
    @apply bg-orange-500 ring-orange-500;
  }
  .safe {
    @apply bg-green-500 ring-green-500;
  }
</style>
