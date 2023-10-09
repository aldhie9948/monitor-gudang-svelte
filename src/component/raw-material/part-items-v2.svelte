<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { IBomAllLevel1 } from "@lib/types";
  export let items: IBomAllLevel1[];
  let pagesSize: number = 3;
  let currentPage: number = 1;

  function paginateItems<T>(
    array: T[],
    itemsPerPage: number,
    pageNumber: number
  ) {
    try {
      const totalPages = Math.ceil(array.length / itemsPerPage);
      if (pageNumber < 1 || pageNumber > totalPages) pageNumber = 1;
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, array.length);
      const itemsOnPage = array.slice(startIndex, endIndex);
      return {
        currentPage: pageNumber,
        totalPages,
        items: itemsOnPage,
      };
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  }

  let paginatedResult = paginateItems(items, pagesSize, currentPage);

  $: {
    paginatedResult = paginateItems(items, pagesSize, currentPage);
    currentPage = paginatedResult.currentPage;
  }
</script>

<div class="mb-5">
  {#if items.length > 0}
    <div class="flex items-center justify-between mb-5">
      <div class="flex gap-2 items-center text-base justify-center flex-grow">
        <Icon
          icon="mdi:archive-cog"
          width="1.5rem"
          class="text-red-500 drop-shadow"
        />
        <h1 class="font-bold drop-shadow">Part's Item</h1>
        <h1
          class="px-2 py-0.5 rounded-full bg-sky-600 text-xs grid place-content-center"
        >
          {pagesSize >= items.length ? items.length : pagesSize} / {items.length}
        </h1>
      </div>
      <select
        bind:value={pagesSize}
        class="outline-none bg-slate-500 rounded py-1.5"
      >
        {#each [3, 5, 10, -1] as opt}
          <option
            class="text-slate-900 text-sm bg-slate-100"
            value={opt === -1 ? items.length : opt}
            >Show {opt === -1 ? "All" : opt}</option
          >
        {/each}
      </select>
    </div>
    {#each paginatedResult.items as item (item.id)}
      <div class="flex gap-2 items-center justify-between my-3">
        <Icon icon="solar:box-outline" width="2rem" class="text-amber-500" />
        <div class="">
          <h2 class="text-xs opacity-70">Nama barang :</h2>
          <h1 class="font-bold">{item.nama_barang}</h1>
          <h1 class="font-bold tracking-widest text-xs -mt-0.5">
            # {item.kode_barang}
          </h1>
        </div>
        <div class="flex-grow border-b border-dashed" />
        <div class="min-w-[3rem]">
          <h2 class="text-xs opacity-70">Pcs :</h2>
          <h1 class="font-bold text-lg">
            {Math.floor(parseFloat(item.hasil_pcs)).toFixed(0)}
          </h1>
        </div>
        <div class="min-w-[5rem]">
          <h2 class="text-xs opacity-70">Satuan :</h2>
          <h1 class="font-bold text-lg">{item.satuan}</h1>
        </div>
      </div>
    {/each}
    <div class="flex gap-2 justify-center items-center">
      <button
        disabled={currentPage === 1}
        on:click={() => currentPage--}
        class="btn flex gap-2 items-center"
        ><Icon icon="ep:d-arrow-left" />
        <h1>Prev</h1>
      </button>
      <button
        on:click={() => currentPage++}
        disabled={currentPage === paginatedResult.totalPages}
        class="btn flex items-center gap-2"
      >
        <h1>Next</h1>
        <Icon icon="ep:d-arrow-right" />
      </button>
    </div>
  {:else}
    <div class="flex gap-2 items-center justify-center my-5">
      <Icon icon="mdi:info" class="text-base" />
      <h1 class="italic opacity-80">Data tidak ditemukan</h1>
    </div>
  {/if}
</div>
