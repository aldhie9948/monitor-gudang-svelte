<script lang="ts">
  import Loading from "@component/Loading.svelte";
  import LatestTransaction from "@component/raw-material/LatestTransaction.svelte";
  import RawMaterialCard from "@component/raw-material/RawMaterialCard.svelte";
  import StatusStokBarang from "@component/raw-material/StatusStokBarang.svelte";
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

  function typeHandleClick(type: ITypeBarang) {
    $currentTypeBarang = type;
    promise = getRawMaterialStockByType(type.kode);
    $currentStockBarang = promise;
    promise.then((data) => ($itemsForSearchForm = data));
  }

  onMount(async () => {
    $typeBarang = await getTypeBarang();
    typeHandleClick($typeBarang[0]);
  });
  $: {
    promise = $currentStockBarang;
    if (promise && parent)
      parent.style.height = window.innerHeight - (parent.offsetTop + 20) + "px";
  }
</script>

<div class="sm:px-7 px-3 xl:py-3">
  <!-- Kategori Tab -->
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
  <!-- End of Kategori Tab -->

  <!-- Content -->
  <div class="grid xl:grid-cols-12 grid-cols-1 gap-2">
    <div
      bind:this={parent}
      class="xl:col-span-8 overflow-y-auto lg:order-first md:order-last"
    >
      {#await promise}
        <div class="flex justify-center items-center h-full">
          <Loading />
          <h1>Loading</h1>
        </div>
      {:then stocks}
        <div class="overflow-y-auto xl:pr-2 snap-y">
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
      <div class="grid xl:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-2">
        <StatusStokBarang />
        <LatestTransaction />
      </div>
    </div>
  </div>
  <!-- End of Content -->
</div>

<style>
  .active {
    @apply text-red-600 border-red-600 bg-red-600/30 rounded-t;
  }

  .activeText {
    @apply text-slate-200;
  }
</style>
