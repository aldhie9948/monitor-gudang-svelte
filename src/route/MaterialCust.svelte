<script lang="ts">
  import Loading from "@component/Loading.svelte";
  import Icon from "@iconify/svelte";
  import { getMaterialCustItems } from "@lib/service";
  import type { IMaterialCust } from "@lib/types";
  import { onMount } from "svelte";
  import { blur } from "svelte/transition";
  let promise: Promise<IMaterialCust[]> = Promise.resolve([]);
  let parent: HTMLElement;
  $: if (promise && parent) {
    parent.style.height = window.innerHeight - (parent.offsetTop + 20) + "px";
  }
  onMount(() => {
    promise = getMaterialCustItems();
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
    <div class="col-span-8 overflow-y-auto">
      {#await promise}
        <div class="flex items-center justify-center gap-2 xl:h-screen h-full">
          <Loading />
          <h1>Loading..</h1>
        </div>
      {:then materials}
        <div in:blur>
          {#each materials as material}
            <h1>{material.nama_barang}</h1>
          {/each}
        </div>
      {:catch err}
        <div class="flex items-center justify-center gap-2 xl:h-screen h-full">
          <Icon icon="material-symbols:error" />
          <h1>{err}</h1>
        </div>
      {/await}
    </div>
    <div class="col-span-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus beatae
      enim reprehenderit debitis omnis molestias assumenda, dolores pariatur
      facilis consequuntur tenetur quidem inventore iusto eum ea repellat
      incidunt! Numquam, officia.
    </div>
  </main>
</div>
