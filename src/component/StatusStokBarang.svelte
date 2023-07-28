<script lang="ts">
  import { onMount } from "svelte";
  import type { RecordStock, StatusStock, StokBarang } from "../lib/types";
  import { getStockByType } from "../lib/service";
  import { currentTypeBarang } from "../lib/store";
  import getStatusStock from "../lib/statusStock";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import ProgressBar from "./ProgressBar.svelte";

  let stokBarang: StokBarang[] = [];
  const arrayStatus: StatusStock[] = [-1, 0, 1];

  function tweenedBuilder(value: number) {
    return tweened(value, {
      duration: 400,
      easing: cubicOut,
    });
  }

  let empty = tweenedBuilder(0);
  let warning = tweenedBuilder(0);
  let safe = tweenedBuilder(0);

  $: {
    arrayStatus.map((status) => {
      const total = stokBarang.filter(
        ({ stok }) => getStatusStock(stok) === status
      ).length;
      if (status === -1) $empty = total;
      if (status === 0) $warning = total;
      if (status === 1) $safe = total;
    });
  }

  $: getStockByType($currentTypeBarang?.nama).then((res) => (stokBarang = res));
</script>

<div class="rounded-lg bg-slate-900 2xl:p-7 p-5 mb-3">
  <h1 class="uppercase font-bold">Status Stok Barang</h1>
  <hr class="border-slate-500/50 2xl:my-3 my-1" />
  <div class="my-2">
    <h1 class="2xl:text-7xl text-6xl font-bold">{stokBarang.length}</h1>
    <h2 class="font-semibold">Total Barang</h2>
  </div>
  <hr class="border-slate-500/50 2xl:my-3 my-1" />
  <h1 class="text-xs mb-2">Label :</h1>
  <div class="flex items-center gap-2 2xl:mb-3 mb-1">
    {#each arrayStatus as status (status)}
      <div
        class="flex items-center gap-1 px-3 rounded-full text-xs 2xl:py-1 py-0.5 mb-2"
        class:emptybg={status === -1}
        class:warningbg={status === 0}
        class:safebg={status === 1}
      >
        <div class="w-2 h-2 rounded-full bg-slate-800" />
        {#if status === -1}
          <h1>Kosong</h1>
        {:else if status === 0}
          <h1>Menipis</h1>
        {:else}
          <h1>Aman</h1>
        {/if}
      </div>
    {/each}
  </div>
  <h1 class="text-xs mb-2">Persentase Stok :</h1>

  <ProgressBar total={stokBarang.length} value={$empty} className="emptybg" />
  <ProgressBar
    total={stokBarang.length}
    value={$warning}
    className="warningbg"
  />
  <ProgressBar total={stokBarang.length} value={$safe} className="safebg" />
</div>
