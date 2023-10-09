<script lang="ts">
  import Icon from "@iconify/svelte";
  import { getRawMaterialLatestTransaction } from "@lib/service";
  import utcTimeConverter from "@lib/time-converter";
  import type { IRawMaterialTransaction, IRawMaterialType } from "@lib/types";
  export let itemType: IRawMaterialType;

  let items: IRawMaterialTransaction[] = [];
  $: getRawMaterialLatestTransaction(itemType?.kode, 5)
    .then((data) => (items = data))
    .catch((err) => console.log(err));
</script>

<div
  class="rounded-lg bg-slate-900 subtle-shadow overflow-hidden flex flex-col p-5"
>
  <div class="flex items-center gap-2">
    <Icon icon="mdi:information" width="1.2rem" class="text-blue-500" />
    <h1 class="font-bold">Transaksi Terbaru</h1>
  </div>
  <hr class="border-slate-500/50 my-2" />
  <div class="flex-grow">
    {#if items.length < 1}
      <div class="flex items-center justify-center gap-2">
        <Icon icon="mdi:information-outline" class="text-lg" />
        <h1 class="text-xs">Transaksi barang terbaru tidak tersedia</h1>
      </div>
    {:else}
      <div class="grid gap-2 grid-cols-1">
        {#each items as item, i (i)}
          <div class="flex justify-between items-center rounded gap-2">
            <div class="flex-grow overflow-hidden">
              <h1 class="2xl:text-lg font-semibold truncate max-w-[83%]">
                {item.kode_barang}
              </h1>
              <h2 class="text-xs font-light w-full truncate">
                {item.nama_barang}
              </h2>
            </div>
            <div class="text-right overflow-hidden flex-shrink-0">
              <h1 class="font-bold 2xl:text-lg">
                {Boolean(item.masuk) ? item.masuk : item.keluar}
                <sup class="font-normal text-xs">{item.satuan || "-"}</sup>
              </h1>
              <h2 class="text-xs font-light w-full truncate 2xl:flex">
                <p>
                  {utcTimeConverter(item.tanggal, "DD/MM/YYYY")}
                </p>
                <p class="2xl:block hidden px-1">-</p>
                <p class="2xl:block hidden">
                  {utcTimeConverter(item.tanggal, "HH:MM")}
                </p>
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
      </div>
    {/if}
  </div>
</div>
