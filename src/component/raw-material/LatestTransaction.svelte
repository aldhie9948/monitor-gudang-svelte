<script lang="ts">
  import Icon from "@iconify/svelte";
  import { getRawMaterialLatestTransaction } from "@lib/service";
  import { currentTypeBarang } from "@lib/store";
  import utcTimeConverter from "@lib/timeConverter";
  import type { IHistoriStokBarang } from "@lib/types";
  import Loading from "../Loading.svelte";

  let latestTransaction: Promise<IHistoriStokBarang[]> = Promise.resolve([]);

  $: {
    const kode = $currentTypeBarang?.kode;
    const limit = 3;
    if (kode) latestTransaction = getRawMaterialLatestTransaction(kode, limit);
  }
</script>

<div>
  <div class="rounded-lg bg-slate-900 p-5 subtle-shadow">
    <div class="flex items-center gap-2">
      <Icon icon="mdi:information" width="1.2rem" class="text-blue-500" />
      <h1 class="font-bold">Transaksi Terbaru</h1>
    </div>
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
              class="flex justify-between items-center gap-2 rounded 2xl:p-2 p-1.5 mb-2"
            >
              <div class="flex-grow">
                <h1 class="2xl:text-base font-semibold truncate max-w-[83%]">
                  {transaction.kode_barang}
                </h1>
                <h2 class="text-xs font-thin">
                  Tgl: {utcTimeConverter(transaction.tanggal, "DD/MM/YYYY")} -
                  {utcTimeConverter(transaction.tanggal, "HH:MM")}
                </h2>
              </div>
              {#if parseFloat(transaction.masuk) > 0}
                <h1 class="font-bold 2xl:text-base">{transaction.masuk}</h1>
                <Icon
                  icon="icon-park-solid:up-two"
                  class="text-green-500 text-lg flex-shrink-0 animate-bounce"
                />
              {:else if parseFloat(transaction.keluar) > 0}
                <h1 class="font-bold 2xl:text-base">{transaction.keluar}</h1>
                <Icon
                  icon="icon-park-solid:down-two"
                  class="text-red-500 text-lg flex-shrink-0 animate-bounce"
                />
              {/if}
            </div>
          {/each}
        {/if}
      {/await}
    </div>
  </div>
</div>
