<script lang="ts">
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import { getStockByType, getTypeBarang } from "../lib/service";
  import {
    currentStockBarang,
    currentTypeBarang,
    typeBarang,
    stockBarangForSearch,
  } from "../lib/store";
  import type { RecordStock, StokBarang, TypeBarang } from "../lib/types";
  import RawMaterialCard from "./RawMaterialCard.svelte";
  import Loading from "./Loading.svelte";
  import StatusStokBarang from "./StatusStokBarang.svelte";

  let promise: Promise<StokBarang[]> = getStockByType();

  async function typeHandleClick(type: TypeBarang) {
    $currentTypeBarang = type;
    promise = getStockByType(type.nama);
    $currentStockBarang = await promise;
    $stockBarangForSearch = await promise;
  }

  onMount(async () => {
    $typeBarang = await getTypeBarang();
    $currentTypeBarang = $currentTypeBarang ?? $typeBarang[0];
    typeHandleClick($currentTypeBarang);
  });

  $: promise = Promise.resolve($currentStockBarang);
</script>

<div class="p-7">
  <div class="border-b-2 border-slate-500/20 mb-3">
    <div class="flex justify-around">
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
  <div class="h-[88vh]">
    <div class="grid grid-cols-12 gap-2 2xl:w-10/12 2xl:mx-auto">
      {#await promise}
        <div class="col-span-8 h-[80vh] flex justify-center items-center">
          <Loading />
          <h1>Loading</h1>
        </div>
      {:then stocks}
        <div class="col-span-8 overflow-y-auto h-[88vh] pr-2 snap-y">
          {#each stocks as stock}
            <RawMaterialCard {stock} />
          {/each}
          {#if stocks.length < 1}
            <div class="flex items-center justify-center gap-2 h-[80vh]">
              <Icon icon="material-symbols:info-outline" class="text-xl" />
              <h1>Barang tidak tersedia untuk kategori tersebut.</h1>
            </div>
          {/if}
        </div>
      {/await}

      <div class="col-span-4">
        <div class="mb-3">
          <h1 class="text-3xl font-bold">{$currentTypeBarang?.nama}</h1>
          <div class="grid grid-cols-2 font-light">
            <h1>Kode : {$currentTypeBarang?.kode}</h1>
            <h1>Jenis : {$currentTypeBarang?.jenis}</h1>
          </div>
        </div>
        <StatusStokBarang />
        <div class="rounded-lg bg-slate-900 p-5">
          <h1 class="uppercase font-bold">Transaksi Terbaru</h1>
          <hr class="border-slate-500/50 my-2" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            error fuga cupiditate, quasi necessitatibus reiciendis ad
            perspiciatis perferendis blanditiis expedita repellendus totam
            fugiat qui modi distinctio quas voluptates aliquid dolor.
          </p>
        </div>
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
