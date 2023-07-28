<script lang="ts">
  import Icon from "@iconify/svelte";
  import {
    currentStockBarang,
    keywordSearch,
    stockBarangForSearch,
  } from "../lib/store";
  export let className: string;

  function searchHandler() {
    if ($keywordSearch === "") return;
    const searchStock = $stockBarangForSearch.filter((stock) => {
      if (
        stock.kode_barang.toLowerCase().includes($keywordSearch.toLowerCase())
      )
        return true;
    });
    $currentStockBarang = searchStock;
  }

  function resetHandler() {
    $keywordSearch = "";
    $currentStockBarang = $stockBarangForSearch;
  }
</script>

<form
  class={className}
  on:submit|preventDefault={searchHandler}
  on:reset|preventDefault={resetHandler}
>
  <div class="xl:flex hidden gap-2 items-center mb-2">
    <Icon icon="mingcute:search-3-line" />
    <h1 class="flex-grow font-semibold">Pencarian</h1>
  </div>
  <input
    type="text"
    bind:value={$keywordSearch}
    class="w-full bg-slate-800 rounded-full px-4 xl:py-2 py-1.5 text-sm duration-200 placeholder:text-xs focus:bg-slate-900 xl:mb-2 xl:mx-0 mx-2"
    placeholder="Kode barang"
  />
  <div class="flex gap-2 items-center">
    <button
      type="submit"
      title="Cari Barang"
      class="text-xs btn flex items-center gap-2 flex-grow justify-center"
    >
      <Icon icon="mingcute:search-2-fill" class="xl:text-sm text-base" />
      <h1 class="xl:block hidden">Cari</h1>
    </button>
    <button type="reset" title="Reset pencarian" class="text-xs btn">
      <Icon icon="material-symbols:device-reset" class="text-base" />
    </button>
  </div>
</form>
