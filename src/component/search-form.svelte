<script lang="ts">
  import Icon from "@iconify/svelte";
  import {
    getMaterialCustItems,
    getRawMaterialItemsByType,
  } from "@lib/service";
  import {
    category,
    materialCustItems,
    rawMaterialItems,
    rawMaterialType,
  } from "@lib/store";

  export let className: string;
  let keyword: string = "";
  let placeholder: any[] = [];

  function filter<T>(item: T, keyword: string, index: string[]) {
    return index
      .map((i) => new RegExp(keyword, "gi").test(item[i]))
      .includes(true);
  }

  async function search() {
    if ($category === "raw-material") {
      const { kode } = $rawMaterialType;
      const items = await getRawMaterialItemsByType(kode);
      placeholder = items;
      $rawMaterialItems = items.filter((i) =>
        filter(i, keyword, ["kode_barang", "nama_barang"])
      );
    } else if ($category === "material-cust") {
      const items = await getMaterialCustItems();
      placeholder = items;
      $materialCustItems = items.filter((i) =>
        filter(i, keyword, ["kode_barang", "nama_barang"])
      );
    }
  }

  async function reset() {
    if (!keyword) return;
    if ($category === "raw-material") {
      $rawMaterialItems = placeholder;
    } else if ($category === "material-cust") {
      $materialCustItems = placeholder;
    }
    keyword = "";
  }
</script>

<form
  class={className}
  on:submit|preventDefault={search}
  on:reset|preventDefault={reset}
>
  <div class="xl:flex hidden gap-2 items-center mb-2">
    <Icon icon="mingcute:search-3-line" />
    <h1 class="flex-grow font-semibold">Pencarian</h1>
  </div>
  <input
    type="text"
    bind:value={keyword}
    class="w-full bg-slate-800 rounded-full px-4 xl:py-2 py-1.5 text-sm duration-200 placeholder:text-xs focus:bg-slate-900 xl:mb-2 xl:mx-0 mx-2"
    placeholder="Kode atau nama barang.."
    required={true}
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
