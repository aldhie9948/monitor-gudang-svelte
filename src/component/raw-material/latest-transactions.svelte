<script lang="ts">
  import Icon from "@iconify/svelte";
  import { getRawMaterialLatestTransaction } from "@lib/service";
  import utcTimeConverter from "@lib/time-converter";
  import type { IRawMaterialTransaction, IRawMaterialType } from "@lib/types";
  export let itemType: IRawMaterialType;

  let items: IRawMaterialTransaction[] = [];
  $: getRawMaterialLatestTransaction(itemType?.kode, 3)
    .then((data) => (items = data))
    .catch((err) => console.log(err));
</script>

<div>
  <div class="rounded-lg bg-slate-900 p-5 subtle-shadow">
    <div class="flex items-center gap-2">
      <Icon icon="mdi:information" width="1.2rem" class="text-blue-500" />
      <h1 class="font-bold">Transaksi Terbaru</h1>
    </div>
    <hr class="border-slate-500/50 my-2" />
    <div class="mt-3">
      {#if items.length < 1}
        <div class="flex items-center justify-center gap-2">
          <Icon icon="mdi:information-outline" class="text-lg" />
          <h1 class="text-xs">Transaksi barang terbaru tidak tersedia</h1>
        </div>
      {:else}
        {#each items as item, i (i)}
          <div
            class="flex justify-between items-center gap-2 rounded 2xl:p-2 p-1.5 mb-2"
          >
            <div class="flex-grow">
              <h1 class="2xl:text-lg font-semibold truncate max-w-[83%]">
                {item.kode_barang}
              </h1>
              <h2 class="text-xs font-light">
                {item.nama_barang}
              </h2>
            </div>
            <div class="text-right">
              <h1 class="font-bold 2xl:text-lg">
                {Boolean(item.masuk) ? item.masuk : item.keluar}
                <sup class="font-normal text-xs">{item.satuan}</sup>
              </h1>
              <h2 class="text-xs font-light">
                {utcTimeConverter(item.tanggal, "DD/MM/YYYY")} -
                {utcTimeConverter(item.tanggal, "HH:MM")}
              </h2>
            </div>
            <Icon
              icon={Boolean(item.masuk)
                ? "icon-park-solid:up-two"
                : "icon-park-solid:down-two"}
              class="{Boolean(item.masuk)
                ? 'text-green-500'
                : 'text-red-500'} text-lg flex-shrink-0 animate-bounce"
            />
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>
