<script lang="ts">
  import Icon from "@iconify/svelte";
  import {
    getRawMaterialPartItems,
    getRawMaterialTransactions,
  } from "@lib/service";
  import { getItemStatusCode } from "@lib/status-code";
  import utcTimeConverter from "@lib/time-converter";
  import type {
    IRawMaterialItem,
    IRawMaterialPartItems,
    IRawMaterialTransaction,
  } from "@lib/types";
  import moment from "moment";
  import { slide } from "svelte/transition";
  import PartItemsV2 from "./part-items-v2.svelte";

  export let item: IRawMaterialItem;
  let transactions: IRawMaterialTransaction[] = [];
  let partItems: IRawMaterialPartItems[] = [];
  let start: string = moment().startOf("month").format("YYYY-MM-DD");
  let end: string = moment().endOf("month").format("YYYY-MM-DD");

  let show = false;

  async function getTransactions() {
    const { kode_barang: code } = item;
    const args = {
      start: moment(start).startOf("day").toISOString(),
      end: moment(end).endOf("day").toISOString(),
      code,
    };
    transactions = await getRawMaterialTransactions(args);
  }

  async function getPartItems() {
    const kode = item.kode_barang;
    partItems = await getRawMaterialPartItems(kode);
  }

  async function toggleShow() {
    if (show) return (show = !show);
    await getTransactions();
    await getPartItems();
    show = !show;
  }
</script>

<div
  class="bg-slate-700 rounded w-full 2xl:py-3 py-2 md:px-4 px-2 cursor-pointer subtle-shadow"
>
  <!-- Header Card -->
  <button
    on:click={toggleShow}
    class="w-full text-left flex items-center md:gap-3 gap-2 justify-between"
  >
    <div>
      {#if getItemStatusCode(item.stok) === -1}
        <Icon icon="mdi:error" class="text-red-400 icon-raw-material" />
      {:else if getItemStatusCode(item.stok) === 0}
        <Icon icon="mdi:alert" class="text-yellow-300 icon-raw-material" />
      {:else if getItemStatusCode(item.stok) === 1}
        <Icon icon="mdi:alert-box" class="text-green-500 icon-raw-material" />
      {/if}
    </div>
    <div class="flex-grow overflow-hidden">
      <h2 class="opacity-50 text-xs font-light -mb-0.5">Kode Barang :</h2>
      <h1 class="font-bold 2xl:text-lg mb-1 truncate">{item.nama_barang}</h1>
      <h2 class="font-light text-xs opacity-50 -mb-0.5">Kode Barang:</h2>
      <h1 class="font-bold tracking-widest">
        {item.kode_barang}
      </h1>
    </div>
    <div class="text-right">
      <p class="font-bold 2xl:text-lg text-base">
        {item.stok}
        <sup class="uppercase text-xs">{item.satuan || "-"}</sup>
      </p>
      <p class="font-light text-xs">
        {item.gudang || "-"}
      </p>
    </div>
    <div>
      {#if show}
        <Icon icon="fa-regular:times-circle" class="text-2xl" />
      {:else}
        <Icon icon="gg:chevron-down-o" class="text-2xl" />
      {/if}
    </div>
  </button>
  <!-- End of Header Card -->

  <!-- Detail Card -->
  {#if show}
    <div class="my-5" transition:slide>
      <PartItemsV2 items={partItems} />

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
          on:click={getTransactions}
          title="Cari transaksi"
          class="btn xl:mt-4 flex items-center gap-2 !px-10 flex-shrink-0"
        >
          <Icon icon="material-symbols:search" />
          <h1>Cari</h1>
        </button>
      </div>
      <!-- End of Date Filter -->

      {#if transactions.length > 0}
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
              {#each transactions as transaction, i (i)}
                <tr class="text-center">
                  <td>{i + 1}</td>
                  <td
                    ><h1>
                      {utcTimeConverter(transaction.tanggal, "DD/MM/YYYY")}
                    </h1></td
                  >
                  <td><h1>{transaction.sisa_stok}</h1></td>
                  <td class:stokMasuk={parseFloat(transaction.masuk) > 0}
                    ><h1>
                      {parseFloat(transaction.masuk) < 1
                        ? "-"
                        : transaction.masuk}
                    </h1></td
                  >
                  <td class:stokKeluar={parseFloat(transaction.keluar) > 0}
                    ><h1>
                      {parseFloat(transaction.keluar) < 1
                        ? "-"
                        : transaction.keluar}
                    </h1></td
                  >
                  <td
                    ><h1>
                      {(
                        parseFloat(transaction.sisa_stok) +
                        parseFloat(transaction.masuk) -
                        parseFloat(transaction.keluar)
                      ).toFixed(2)}
                    </h1></td
                  >
                  <td><h1>{transaction.no_lot}</h1></td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else}
        <div class="flex items-center justify-center gap-2 my-5">
          <Icon icon="mdi:info" class="text-base" />
          <h1 class="italic opacity-80">
            Tidak ada atau transaksi tidak ditemukan
          </h1>
        </div>
      {/if}
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
