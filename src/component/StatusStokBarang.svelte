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
    const arrayStatus: StatusStock[] = [-1, 0, 1];
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
  <hr class="border-slate-500/50 my-3" />
  <div class="my-2">
    <h1 class="text-7xl font-bold">{stokBarang.length}</h1>
    <h2 class="font-semibold">Total Barang</h2>
  </div>
  <hr class="border-slate-500/50 my-5" />

  <ProgressBar total={stokBarang.length} value={$empty} className="empty-bg" />
  <ProgressBar
    total={stokBarang.length}
    value={$warning}
    className="warning-bg"
  />
  <ProgressBar total={stokBarang.length} value={$safe} className="safe-bg" />
</div>
