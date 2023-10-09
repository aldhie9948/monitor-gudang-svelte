<script lang="ts">
  import Information from "@component/material-cust/information.svelte";
  import MaterialCustCard from "@component/material-cust/material-cust-card.svelte";
  import Icon from "@iconify/svelte";
  import { getMaterialCustItems } from "@lib/service";
  import { materialCustItems } from "@lib/store";
  import type { IMaterialCustItem } from "@lib/types";
  import { onMount } from "svelte";

  let items: IMaterialCustItem[] = [];

  onMount(async () => {
    items = await getMaterialCustItems();
    $materialCustItems = items;
  });
</script>

<div class="px-7 xl:py-7 py-0 flex flex-col xl:h-screen md:h-[93vh]">
  <div class="flex gap-2 items-center">
    <Icon icon="solar:box-bold" width="3rem" class="text-red-500" />
    <div>
      <h1 class="text-3xl font-bold">Material Customer</h1>
      <h2 class="text-xs font-light text-slate-300">
        Bahan atau komponen yang diproduksi atau dipesan khusus untuk memenuhi
        kebutuhan spesifik dari pelanggan.
      </h2>
    </div>
  </div>
  <hr class="my-3 opacity-30" />
  <main
    class="grid xl:grid-cols-12 grid-cols-1 gap-4 overflow-hidden flex-grow"
  >
    <div
      class="xl:col-span-8 xl:order-first order-last overflow-auto grid grid-cols-1 gap-4"
    >
      {#each $materialCustItems as item, i (i)}
        <MaterialCustCard {item} />
      {/each}
    </div>
    <div class="xl:col-span-4">
      <Information {items} />
    </div>
  </main>
</div>
