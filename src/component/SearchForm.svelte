<script lang="ts">
  import Icon from "@iconify/svelte";
  import {
    currentStockBarang,
    keywordSearch,
    itemsForSearchForm,
    currentMaterialCust,
    selectedCategory,
  } from "@lib/store";
  import {
    isIStokBarang,
    type IMaterialCust,
    type IStokBarang,
    isIMaterialCust,
  } from "@lib/types";
  import _ from "lodash";

  export let className: string;

  function findKeyword<T>(items: T[], fields: string | string[]): T[] {
    const results = items.filter((item) => {
      const regex = new RegExp($keywordSearch, "gi");
      if (typeof fields === "string") return regex.test(item[fields]);
      const isFoundArr = fields.map((field) => regex.test(item[field]));
      return isFoundArr.includes(true);
    });
    return results;
  }

  function searchHandler() {
    switch ($selectedCategory.toLowerCase()) {
      case "raw material":
        $currentStockBarang = Promise.resolve(
          findKeyword(<IStokBarang[]>$itemsForSearchForm, [
            "kode_barang",
            "nama_barang",
          ])
        );
        break;

      case "material cust":
        $currentMaterialCust = Promise.resolve(
          findKeyword(<IMaterialCust[]>$itemsForSearchForm, [
            "kode_barang",
            "nama_barang",
          ])
        );
        break;

      default:
        break;
    }
  }

  function resetHandler() {
    $keywordSearch = "";
    switch ($selectedCategory.toLowerCase()) {
      case "raw material":
        $currentStockBarang = Promise.resolve(
          <IStokBarang[]>$itemsForSearchForm
        );
        break;

      case "material cust":
        $currentMaterialCust = Promise.resolve(
          <IMaterialCust[]>$itemsForSearchForm
        );
        break;

      default:
        break;
    }
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
