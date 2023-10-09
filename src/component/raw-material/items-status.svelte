<script lang="ts">
  import Icon from "@iconify/svelte";
  import { getItemStatusCode } from "@lib/status-code";
  import type { IRawMaterialItem, StatusCode } from "@lib/types";
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import ProgressBar from "./progress-bar.svelte";

  const statusCode: StatusCode[] = [-1, 0, 1];
  export let items: IRawMaterialItem[] = [];

  const config = {
    duration: 400,
    easing: cubicOut,
  };

  let empty = tweened(0, config);
  let warning = tweened(0, config);
  let safe = tweened(0, config);

  $: {
    statusCode.map((status) => {
      const counted = items.filter(
        (i) => getItemStatusCode(i.stok) === status
      ).length;
      if (status === -1) $empty = counted;
      else if (status === 0) $warning = counted;
      else if (status === 1) $safe = counted;
    });
  }
</script>

<div class="rounded-lg bg-slate-900 2xl:p-7 p-5 subtle-shadow">
  <div class="flex items-center gap-2">
    <Icon icon="mdi:information" width="1.2rem" class="text-blue-500" />
    <h1 class="font-bold">Status Stok Barang</h1>
  </div>
  <hr class="border-slate-500/50 2xl:my-3 my-2" />
  <div class="my-2">
    <h1 class="2xl:text-7xl text-6xl font-bold">{items.length}</h1>
    <h2 class="font-semibold">Total Barang</h2>
  </div>
  <hr class="border-slate-500/50 2xl:my-3 my-1" />
  <h1 class="text-xs mb-2">Label :</h1>
  <div class="flex flex-wrap items-center gap-2 2xl:mb-3 mb-1">
    {#each statusCode as status (status)}
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

  <ProgressBar total={items.length} value={$empty} className="emptybg" />
  <ProgressBar total={items.length} value={$warning} className="warningbg" />
  <ProgressBar total={items.length} value={$safe} className="safebg" />
</div>
