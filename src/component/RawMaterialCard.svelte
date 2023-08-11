<script lang="ts">
  import type { StokBarang, HistoriStokBarang } from "@lib/types";
  import Icon from "@iconify/svelte";
  import { getRawMaterialDetailTransaction } from "@lib/service";
  import moment from "moment";
  import Loading from "./Loading.svelte";
  import getStatusStock from "@lib/statusStock";

  export let stock: StokBarang;
  let detailTransaction: Promise<HistoriStokBarang[]> = Promise.resolve([]);
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

  function detailShownHandler() {
    if (isDetailShown) return (isDetailShown = !isDetailShown);
    fetchDetailTransaction();
    isDetailShown = !isDetailShown;
  }
</script>

<div
  class="bg-slate-700 mb-2 rounded w-full 2xl:py-3 py-2 px-4 cursor-pointer snap-start"
>
  <button
    on:click={detailShownHandler}
    class="w-full text-left flex items-center gap-3 justify-between"
  >
    <div
      class="w-6 h-6 rounded-full animate-pulse ring-4"
      class:empty={getStatusStock(stock.stok) === -1}
      class:danger={getStatusStock(stock.stok) === 0}
      class:safe={getStatusStock(stock.stok) === 1}
    />
    <div class="flex-grow">
      <h1 class="font-bold xl:text-lg">{stock.nama_barang}</h1>
      <h2 class="font-light text-xs">Kode: {stock.kode_barang}</h2>
    </div>
    <div class="text-right">
      <h1 class="font-bold xl:text-lg">
        {stock.stok}
        <sup class="uppercase text-xs">{stock.satuan || "-"}</sup>
      </h1>
      <h2 class="font-light text-xs xl:block hidden">
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

  {#if isDetailShown}
    <div class="my-5">
      <div
        class="flex items-center xl:justify-start justify-center gap-2 mb-3 flex-wrap"
      >
        <div>
          <h1 class="text-xs font-light">Start:</h1>
          <input
            bind:value={start}
            type="date"
            class="bg-slate-500/50 py-[0.4rem] rounded-full px-2"
          />
        </div>
        <div>
          <h1 class="text-xs font-light">End:</h1>
          <input
            bind:value={end}
            type="date"
            class="bg-slate-500/50 py-[0.4rem] rounded-full px-2"
          />
        </div>
        <button
          on:click={fetchDetailTransaction}
          title="Cari transaksi"
          class="btn xl:mt-4 flex items-center gap-2 !px-7"
        >
          <Icon icon="material-symbols:search" />
          <h1>Cari</h1>
        </button>
      </div>

      {#await detailTransaction}
        <div class="flex justify-center items-center">
          <Loading />
        </div>
      {:then transaction}
        {#if transaction.length < 1}
          <div class="flex items-center justify-center gap-2">
            <Icon icon="material-symbols:info-outline" />
            <h1>Transaksi tidak tersedia.</h1>
          </div>
        {:else}
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
                        {moment.utc(item.tanggal).format("DD/MM/YYYY")}
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
        {/if}
      {/await}
    </div>
  {/if}
</div>

<style>
  .empty {
    @apply bg-red-500 ring-red-300;
  }
  .danger {
    @apply bg-orange-500 ring-orange-300;
  }
  .safe {
    @apply bg-green-500 ring-green-300;
  }

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
