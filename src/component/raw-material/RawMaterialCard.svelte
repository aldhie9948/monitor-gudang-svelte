<script lang="ts">
  import Icon from "@iconify/svelte";
  import {
    getBomAllLevel1,
    getRawMaterialDetailTransaction,
  } from "@lib/service";
  import getStatusStock from "@lib/statusStock";
  import utcTimeConverter from "@lib/timeConverter";
  import type {
    IBomAllLevel1,
    IHistoriStokBarang,
    IStokBarang,
  } from "@lib/types";
  import moment from "moment";
  import { slide } from "svelte/transition";
  import Loading from "../Loading.svelte";
  import PartItemsV2 from "./PartItemsV2.svelte";

  export let stock: IStokBarang;
  let pagesSize: number = 3;
  let detailTransaction: Promise<IHistoriStokBarang[]> = Promise.resolve([]);
  let bomAllLevel1: Promise<IBomAllLevel1[]> = Promise.resolve([]);
  let start: string = moment().startOf("month").format("YYYY-MM-DD");
  let end: string = moment().endOf("month").format("YYYY-MM-DD");

  let isDetailShown = false;

  function fetchDetailTransaction() {
    const { kode_barang: kode } = stock;
    const args = {
      start: moment(start).startOf("day").toISOString(),
      end: moment(end).endOf("day").toISOString(),
      kode,
    };

    detailTransaction = getRawMaterialDetailTransaction(args);
  }

  function fetchBomAllLevel1() {
    const kode = stock.kode_barang;
    bomAllLevel1 = getBomAllLevel1(kode);
  }

  function detailShownHandler() {
    if (isDetailShown) return (isDetailShown = !isDetailShown);
    fetchDetailTransaction();
    fetchBomAllLevel1();
    isDetailShown = !isDetailShown;
  }
</script>

<div
  class="bg-slate-700 mb-2 rounded w-full 2xl:py-3 py-2 px-4 cursor-pointer snap-start subtle-shadow"
>
  <!-- Header Card -->
  <button
    on:click={detailShownHandler}
    class="w-full text-left flex items-center gap-3 justify-between"
  >
    <div>
      {#if getStatusStock(stock.stok) === -1}
        <Icon icon="mdi:error" class="text-red-400 icon-raw-material" />
      {:else if getStatusStock(stock.stok) === 0}
        <Icon icon="mdi:alert" class="text-yellow-300 icon-raw-material" />
      {:else if getStatusStock(stock.stok) === 1}
        <Icon icon="mdi:alert-box" class="text-green-500 icon-raw-material" />
      {/if}
    </div>
    <div class="flex-grow">
      <h2 class="opacity-50 text-xs font-light -mb-0.5">Kode Barang :</h2>
      <h1 class="font-bold 2xl:text-lg mb-1">{stock.nama_barang}</h1>
      <h2 class="font-light text-xs opacity-50 -mb-0.5">Kode Barang:</h2>
      <h1 class="font-bold tracking-widest">
        {stock.kode_barang}
      </h1>
    </div>
    <div class="text-right">
      <h1 class="font-bold 2xl:text-lg text-base">
        {stock.stok}
        <sup class="uppercase text-xs">{stock.satuan || "-"}</sup>
      </h1>
      <h2 class="font-light text-xs md:block hidden">
        {stock.gudang || "-"}
      </h2>
    </div>
    <div>
      {#if isDetailShown}
        <Icon icon="fa-regular:times-circle" class="text-2xl" />
      {:else}
        <Icon icon="gg:chevron-down-o" class="text-2xl" />
      {/if}
    </div>
  </button>
  <!-- End of Header Card -->

  <!-- Detail Card -->
  {#if isDetailShown}
    <div class="my-5" transition:slide>
      <!-- Bom All Level 1 -->
      <div class="mb-5">
        {#await bomAllLevel1}
          <div class="flex justify-center items-center">
            <Loading />
          </div>
        {:then items}
          <!-- <PartItems {items} /> -->
          <PartItemsV2 {items} />
        {:catch err}
          <div class="flex gap-2 items-center justify-center my-5">
            <Icon icon="mdi:info" class="text-base" />
            <h1 class="italic opacity-80">{err}</h1>
          </div>
        {/await}
      </div>
      <!-- End of Bom All Level 1 -->

      <!-- Date Filter -->
      <div
        class="flex items-center xl:justify-start justify-center gap-2 mb-3 lg:flex-nowrap flex-wrap"
      >
        <div>
          <h1 class="text-xs font-light">Start:</h1>
          <input
            bind:value={start}
            type="date"
            class="bg-slate-500/50 py-[0.4rem] rounded-full px-2 w-full"
          />
        </div>
        <div>
          <h1 class="text-xs font-light">End:</h1>
          <input
            bind:value={end}
            type="date"
            class="bg-slate-500/50 py-[0.4rem] rounded-full px-2 w-full"
          />
        </div>
        <button
          on:click={fetchDetailTransaction}
          title="Cari transaksi"
          class="btn xl:mt-4 flex items-center gap-2 !px-10 flex-shrink-0"
        >
          <Icon icon="material-symbols:search" />
          <h1>Cari</h1>
        </button>
      </div>
      <!-- End of Date Filter -->

      {#await detailTransaction}
        <div class="flex justify-center items-center">
          <Loading />
        </div>
      {:then transaction}
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Tanggal</th>
                <th>Stok Awal</th>
                <th>In</th>
                <th>Out</th>
                <th>Stok Akhir</th>
                <th>Lot Material</th>
              </tr>
            </thead>
            <tbody>
              {#each transaction as item, i (i)}
                <tr class="text-center">
                  <td>{i + 1}</td>
                  <td
                    ><h1>
                      {utcTimeConverter(item.tanggal, "DD/MM/YYYY")}
                    </h1></td
                  >
                  <td><h1>{item.sisa_stok}</h1></td>
                  <td class:stokMasuk={parseFloat(item.masuk) > 0}
                    ><h1>
                      {parseFloat(item.masuk) < 1 ? "-" : item.masuk}
                    </h1></td
                  >
                  <td class:stokKeluar={parseFloat(item.keluar) > 0}
                    ><h1>
                      {parseFloat(item.keluar) < 1 ? "-" : item.keluar}
                    </h1></td
                  >
                  <td
                    ><h1>
                      {(
                        parseFloat(item.sisa_stok) +
                        parseFloat(item.masuk) -
                        parseFloat(item.keluar)
                      ).toFixed(2)}
                    </h1></td
                  >
                  <td><h1>{item.no_lot}</h1></td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:catch err}
        <div class="flex items-center justify-center gap-2 my-5">
          <Icon icon="mdi:info" class="text-base" />
          <h1 class="italic opacity-80">{err}</h1>
        </div>
      {/await}
    </div>
  {/if}
  <!-- End of Detail Card -->
</div>

<style>
  table {
    @apply border whitespace-nowrap;
  }

  td,
  th {
    @apply border;
  }

  th {
    @apply bg-slate-500/50;
  }

  .stokMasuk {
    @apply bg-green-500/50;
  }

  .stokKeluar {
    @apply bg-red-500/50;
  }
</style>
