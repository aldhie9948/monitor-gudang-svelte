<script lang="ts">
  import moment from "moment";
  import { getDetailTransaction } from "../lib/service";
  import { currentTypeBarang } from "../lib/store";
  import Icon from "@iconify/svelte";
  import type {
    DetailTransactionParams,
    HistoriStokBarang,
  } from "../lib/types";
  import Loading from "./Loading.svelte";
  let args: DetailTransactionParams;
  let latestTransaction: Promise<HistoriStokBarang[]> = Promise.resolve([]);

  $: {
    args = {
      kode: $currentTypeBarang?.kode,
      start: moment().startOf("month").toISOString(),
      end: moment().endOf("month").toISOString(),
      limit: 3,
    };
    latestTransaction = getDetailTransaction(args);
  }
</script>

<div class="rounded-lg bg-slate-900 p-5">
  <h1 class="uppercase font-bold">Transaksi Terbaru</h1>
  <hr class="border-slate-500/50 my-2" />
  <div class="mt-3">
    {#await latestTransaction}
      <div class="flex justify-center items-center h-full">
        <Loading />
      </div>
    {:then transactions}
      {#if transactions.length < 1}
        <div class="flex items-center justify-center gap-2">
          <Icon icon="mdi:information-outline" class="text-lg" />
          <h1 class="text-xs">Transaksi barang terbaru tidak tersedia</h1>
        </div>
      {:else}
        {#each transactions as transaction, i (i)}
          <div
            class="flex justify-between items-center gap-2 bg-slate-700 rounded 2xl:p-2 p-1.5 mb-2"
          >
            <div class="flex-grow">
              <h1 class="text-base font-semibold truncate max-w-[83%]">
                {transaction.kode_barang}
              </h1>
              <h2 class="text-xs font-thin">
                Tgl: {moment.utc(transaction.tanggal).format("DD/MM/YYYY")}
              </h2>
            </div>
            {#if parseFloat(transaction.masuk) > 0}
              <h1 class="font-bold text-lg">{transaction.masuk}</h1>
              <Icon
                icon="icon-park-solid:up-two"
                class="text-green-500 text-lg flex-shrink-0"
              />
            {:else if parseFloat(transaction.keluar) > 0}
              <h1 class="font-bold text-lg">{transaction.keluar}</h1>
              <Icon
                icon="icon-park-solid:down-two"
                class="text-red-500 text-lg flex-shrink-0"
              />
            {/if}
          </div>
        {/each}
      {/if}
    {/await}
  </div>
</div>
