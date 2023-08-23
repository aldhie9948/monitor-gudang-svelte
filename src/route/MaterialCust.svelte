<script lang="ts">
  import Loading from "@component/Loading.svelte";
  import Card from "@component/material-cust/Card.svelte";
  import Information from "@component/material-cust/Information.svelte";
  import Icon from "@iconify/svelte";
  import { getMaterialCustItems } from "@lib/service";
  import { currentMaterialCust, itemsForSearchForm } from "@lib/store";
  import type { IMaterialCust } from "@lib/types";
  import { onMount } from "svelte";

  let promise: Promise<IMaterialCust[]> = Promise.resolve([]);
  let parent: HTMLElement;
  let information: IMaterialCust[] = [];

  $: if (promise && parent) {
    parent.style.height = window.innerHeight - (parent.offsetTop + 20) + "px";
  }

  $: promise = $currentMaterialCust;

  onMount(async () => {
    promise = getMaterialCustItems();

    $currentMaterialCust = promise;
    promise.then((data) => {
      $itemsForSearchForm = data;
      information = data;
    });
  });
</script>

<div class="px-7 xl:py-7 py-0">
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
  <main bind:this={parent} class="grid grid-cols-12 gap-2">
    <div
      class="xl:col-span-8 col-span-12 xl:order-first order-last overflow-y-auto xl:pr-4"
    >
      {#await promise}
        <div class="flex items-center justify-center gap-2 xl:h-screen h-full">
          <Loading />
          <h1>Loading..</h1>
        </div>
      {:then items}
        <div>
          {#each items as item}
            <Card {item} />
          {/each}
        </div>
      {:catch err}
        <div class="flex items-center justify-center gap-2 xl:h-screen h-full">
          <Icon icon="material-symbols:error" />
          <h1>{err}</h1>
        </div>
      {/await}
    </div>
    <div class="xl:col-span-4 md:col-span-6 col-span-12">
      <!-- {#await information}
        <div class="flex items-center justify-center gap-2 xl:h-screen h-full">
          <Loading />
          <h1>Loading..</h1>
        </div>
      {:then info}
      {/await} -->
      <Information {information} />
    </div>
  </main>
</div>
