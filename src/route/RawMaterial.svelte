<script lang="ts">
  import LatestTransaction from "@component/LatestTransaction.svelte";
  import Loading from "@component/Loading.svelte";
  import RawMaterialCard from "@component/RawMaterialCard.svelte";
  import StatusStokBarang from "@component/StatusStokBarang.svelte";
  import Icon from "@iconify/svelte";
  import { getRawMaterialStockByType, getTypeBarang } from "@lib/service";
  import {
    currentStockBarang,
    currentTypeBarang,
    itemsForSearchForm,
    typeBarang,
  } from "@lib/store";
  import type { IStokBarang, ITypeBarang } from "@lib/types";
  import { onMount } from "svelte";

  let promise: Promise<IStokBarang[]> = Promise.resolve([]);
  let parent: HTMLElement;

  async function typeHandleClick(type: ITypeBarang) {
    $currentTypeBarang = type;
    promise = getRawMaterialStockByType(type.kode);
    $currentStockBarang = await promise;
    $itemsForSearchForm = await promise;
  }

  onMount(async () => {
    $typeBarang = await getTypeBarang();
    typeHandleClick($typeBarang[0]);
  });

  $: {
    promise = Promise.resolve($currentStockBarang);
    if (promise && parent)
      parent.style.height = window.innerHeight - (parent.offsetTop + 20) + "px";
  }
</script>

<div class="px-7 xl:py-3">
  <div class="border-b-2 border-slate-500/20 mb-3">
    <div class="flex justify-around flex-wrap">
      {#each $typeBarang as type}
        <button
          on:click={() => typeHandleClick(type)}
          class="flex items-center flex-grow gap-1 py-2 2xl:text-base text-xs font-bold duration-200 border-b-4 border-transparent text-slate-200/50 hover:text-slate-200 hover:border-slate-200 justify-center"
          class:active={$currentTypeBarang?.nama === type.nama}
        >
          <Icon icon="pepicons-pop:label" />
          <h1>{type.nama}</h1>
          <h1 class:activeText={$currentTypeBarang?.nama === type.nama}>
            {type.total}
          </h1>
        </button>
      {/each}
    </div>
  </div>

  <div class="grid xl:grid-cols-12 grid-cols-1 gap-2 2xl:w-10/12 2xl:mx-auto">
    <div
      bind:this={parent}
      class="xl:col-span-8 overflow-y-auto xl:order-first order-last"
    >
      {#await promise}
        <div class="flex justify-center items-center xl:order-first order-last">
          <Loading />
          <h1>Loading</h1>
        </div>
      {:then stocks}
        <div class="overflow-y-auto xl:pr-2 snap-y xl:order-first order-last">
          {#each stocks as stock}
            <RawMaterialCard {stock} />
          {/each}
          {#if stocks.length < 1}
            <div
              class="flex items-center justify-center gap-2 xl:h-[80vh] h-[50vh]"
            >
              <Icon icon="material-symbols:info-outline" class="text-xl" />
              <h1>Barang tidak tersedia untuk kategori tersebut.</h1>
            </div>
          {/if}
        </div>
      {/await}
    </div>

    <div class="xl:col-span-4">
      <div class="mb-3">
        <h1 class="text-3xl font-bold">{$currentTypeBarang?.nama}</h1>
        <div class="grid grid-cols-2 font-light">
          <h1>Kode : {$currentTypeBarang?.kode}</h1>
          <h1>Jenis : {$currentTypeBarang?.jenis}</h1>
        </div>
      </div>
      <div class="grid xl:grid-cols-1 grid-cols-2 gap-2">
        <StatusStokBarang />
        <LatestTransaction />
      </div>
    </div>
  </div>
</div>

<style>
  .active {
    @apply text-red-600 border-red-600 bg-red-600/30 rounded-t;
  }

  .activeText {
    @apply text-slate-200;
  }
</style>
