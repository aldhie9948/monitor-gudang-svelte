<script lang="ts">
  import Loading from "@component/loading.svelte";
  import Icon from "@iconify/svelte";
  import generateQRCode from "@lib/qrcode";
  import { getItemStatusCode } from "@lib/status-code";
  import type { IMaterialCust } from "@lib/types";
  import { slide } from "svelte/transition";

  export let item: IMaterialCust;
  let show: boolean = false;
  let qrcode = generateQRCode(item.qrcode);

  function openCard() {
    show = !show;
  }
</script>

<div class="bg-slate-700 subtle-shadow px-4 py-3 rounded mb-4">
  <button
    on:click={openCard}
    class="flex items-center gap-4 cursor-pointer w-full text-left"
  >
    <Icon icon="fluent-mdl2:product-variant" width="2rem" />
    <div class="flex-grow">
      <h2 class="text-xs opacity-70">Nama Barang :</h2>
      <h1 class="font-bold mb-1">{item.nama_barang}</h1>
      <h2 class="text-xs opacity-70">Kode Barang :</h2>
      <h2 class="font-light text-xs">
        <span class="font-bold text-red-500">{item.kode_barang}</span>
      </h2>
    </div>
    <div class="text-right">
      <div class="flex items-center justify-end gap-2">
        <span
          class:dangerDot={getItemStatusCode(item.stok) === -1}
          class:warningDot={getItemStatusCode(item.stok) === 0}
          class:safeDot={getItemStatusCode(item.stok) === 1}
          class="w-2 h-2 ring rounded-full animate-pulse"
        />
        <h1
          class:dangerText={getItemStatusCode(item.stok) === -1}
          class:warningText={getItemStatusCode(item.stok) === 0}
          class:safeText={getItemStatusCode(item.stok) === 1}
          class="text-lg text-red-500 font-bold"
        >
          {item.stok}
        </h1>
      </div>
      <h1 class="text-xs">{item.gudang}</h1>
    </div>
    {#if show}
      <Icon icon="mdi:chevron-up" class="text-3xl" />
    {:else}
      <Icon icon="mdi:chevron-down" class="text-3xl" />
    {/if}
  </button>
  {#if show}
    <div class="grid md:grid-cols-12 grid-cols-1 my-4" transition:slide>
      {#await qrcode}
        <div class="flex items-center justify-center h-full col-span-4">
          <Loading />
        </div>
      {:then src}
        <img
          {src}
          alt={item.qrcode}
          class="col-span-4 mx-auto rounded subtle-shadow self-center"
        />
      {/await}
      <div class="col-span-8">
        <div class="grid grid-cols-1 gap-1">
          <div>
            <h2 class="opacity-70 text-xs">Nama Barang :</h2>
            <h1>{item.nama_barang}</h1>
          </div>
          <div>
            <h2 class="opacity-70 text-xs">Kode Barang :</h2>
            <h1>{item.kode_barang}</h1>
          </div>
          <div class="grid grid-cols-2 gap-1">
            <div>
              <h2 class="opacity-70 text-xs">Tipe Barang :</h2>
              <h1>{item.tipe_barang}</h1>
            </div>
            <div>
              <h2 class="opacity-70 text-xs">Kategori :</h2>
              <h1>{item.kategori}</h1>
            </div>
            <div>
              <h2 class="opacity-70 text-xs">Gudang :</h2>
              <h1>{item.gudang}</h1>
            </div>
            <div>
              <h2 class="opacity-70 text-xs">Satuan :</h2>
              <h1>{item.satuan}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .dangerText {
    @apply text-red-500;
  }
  .warningText {
    @apply text-orange-500;
  }
  .safeText {
    @apply text-green-500;
  }

  .dangerDot {
    @apply ring-red-300 bg-red-500;
  }
  .warningDot {
    @apply ring-orange-300 bg-orange-500;
  }
  .safeDot {
    @apply ring-green-300 bg-green-500;
  }
</style>
