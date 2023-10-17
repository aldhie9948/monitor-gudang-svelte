<script lang="ts">
  import RawMaterialCard from "@component/raw-material/raw-material-card.svelte";
  import SidebarInfo from "@component/raw-material/sidebar-info.svelte";
  import Icon from "@iconify/svelte";
  import { getRawMaterialItemsByType, getRawMaterialTypes } from "@lib/service";
  import { category, rawMaterialItems, rawMaterialType } from "@lib/store";
  import type { IRawMaterialItem, IRawMaterialType } from "@lib/types";
  import { onMount } from "svelte";

  let itemsType: IRawMaterialType[] = [];
  let items: IRawMaterialItem[] = [];
  function toggleItemType(type: IRawMaterialType) {
    return async () => {
      items = await getRawMaterialItemsByType(type.kode);
      $rawMaterialItems = items;
      $rawMaterialType = type;
    };
  }

  onMount(async () => {
    itemsType = await getRawMaterialTypes();
    if (itemsType.length > 0) toggleItemType(itemsType[0])();
    $category = "raw-material";
  });
</script>

<div
  class="sm:px-7 px-3 xl:py-3 flex flex-col overflow-hidden xl:h-screen md:h-[93vh]"
>
  <div class="border-b-2 border-slate-500/20 mb-3">
    <div class="flex justify-around flex-wrap">
      {#each itemsType as type}
        <button
          on:click={toggleItemType(type)}
          class="flex items-center flex-grow gap-1 py-2 2xl:text-base text-xs font-bold duration-200 border-b-4 border-transparent text-slate-200/50 hover:text-slate-200 hover:border-slate-200 justify-center"
          class:active={$rawMaterialType?.nama === type.nama}
        >
          <Icon icon="pepicons-pop:label" />
          <h1>{type.nama}</h1>
          <h1 class:activeText={$rawMaterialType?.nama === type.nama}>
            {type.total}
          </h1>
        </button>
      {/each}
    </div>
  </div>
  <div class="grid xl:grid-cols-12 grid-cols-1 gap-4 overflow-hidden">
    <div
      class="xl:col-span-8 overflow-auto xl:order-first order-last flex flex-col gap-3"
    >
      {#each $rawMaterialItems as item, i (i)}
        <RawMaterialCard {item} />
      {/each}
    </div>
    <div class="xl:col-span-4">
      <SidebarInfo itemType={$rawMaterialType} {items} />
    </div>
  </div>
</div>

<style lang="scss">
  .active {
    @apply text-red-600 border-red-600 bg-red-600/30 rounded-t;
  }

  .activeText {
    @apply text-slate-200;
  }
</style>
