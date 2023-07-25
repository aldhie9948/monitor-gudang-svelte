<script lang="ts">
  import { keywordSearch } from "../lib/store";
  import Icon from "@iconify/svelte";
</script>

<div>
  <div class="flex gap-2 items-center mb-2">
    <Icon icon="mingcute:search-3-line" />
    <h1 class="flex-grow font-semibold">Pencarian</h1>
  </div>
  <input
    type="text"
    bind:value={$keywordSearch}
    class="w-full bg-slate-800 rounded-full px-4 py-2 text-sm duration-200 placeholder:text-xs focus:bg-slate-900 mb-2"
    placeholder="Kode atau nama barang"
  />
  <div class="flex gap-2 items-center">
    <button
      title="Cari Kode atau Nama Barang"
      class="text-xs btn flex items-center gap-2 flex-grow justify-center"
    >
      <Icon icon="mingcute:search-2-fill" />
      <h1>Search</h1>
    </button>
    <button title="Reset pencarian" class="text-xs btn">
      <Icon icon="material-symbols:device-reset" class="text-base" />
    </button>
  </div>
</div>
