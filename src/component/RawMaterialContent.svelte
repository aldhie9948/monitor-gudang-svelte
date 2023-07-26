<script lang="ts">
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import { getStockByType, getTypeBarang } from "../lib/service";
  import {
    currentStockBarang,
    currentTypeBarang,
    typeBarang,
  } from "../lib/store";
  import type { TypeBarang } from "../lib/types";
  import RawMaterialCard from "./RawMaterialCard.svelte";

  async function typeHandleClick(type: TypeBarang) {
    $currentTypeBarang = type;
    $currentStockBarang = await getStockByType(type.nama);
  }

  onMount(async () => {
    $typeBarang = await getTypeBarang();
    $currentTypeBarang = $typeBarang[0];
    typeHandleClick($currentTypeBarang);
  });
</script>

<div class="p-7">
  <div class="border-b-2 border-slate-500/20 mb-3">
    <div class="grid grid-cols-9">
      {#each $typeBarang as type}
        <button
          on:click={() => typeHandleClick(type)}
          class="flex items-center gap-2 py-2 2xl:text-base text-xs font-bold duration-200 border-b-4 border-transparent text-slate-200/50 hover:text-slate-200 hover:border-slate-200 justify-center"
          class:active={$currentTypeBarang?.nama === type.nama}
        >
          <Icon icon="pepicons-pop:label" />
          <h1>
            {type.nama}
          </h1>
        </button>
      {/each}
    </div>
  </div>
  <div class="h-[88vh]">
    <div class="grid grid-cols-12 gap-2 2xl:w-10/12 2xl:mx-auto">
      <div class="col-span-8 overflow-y-auto h-[88vh] pr-2 snap-y">
        {#each $currentStockBarang as stock}
          <RawMaterialCard {stock} />
        {/each}
      </div>
      <div class="col-span-4">
        <div class="mb-3">
          <h1 class="text-3xl font-bold">{$currentTypeBarang?.nama}</h1>
          <div class="grid grid-cols-2 font-light">
            <h1>Kode : {$currentTypeBarang?.kode}</h1>
            <h1>Jenis : {$currentTypeBarang?.jenis}</h1>
          </div>
        </div>
        <div class="rounded-lg bg-slate-900 p-5">
          <h1 class="uppercase font-bold">Status Stok Barang</h1>
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
</style>
