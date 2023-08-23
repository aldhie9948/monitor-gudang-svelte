<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { IBomAllLevel1 } from "@lib/types";
  export let items: IBomAllLevel1[];
  let indexShow: number = items.length > 10 ? 4 : items.length;
</script>

<div>
  <div class="flex justify-between items-center mb-5 gap-2">
    <Icon icon="mdi:info" class="text-xl text-blue-500" />
    <h1 class="font-bold flex-grow">Information</h1>

    <h1 class="opacity-80">Tampilkan :</h1>
    <select
      bind:value={indexShow}
      class="bg-transparent pr-5 py-1 outline-none border rounded"
    >
      {#each [4, 8, 12, 16, -1] as i}
        <option class="text-slate-900" value={i === -1 ? items.length : i}
          >{i === -1 ? "Semua" : i}</option
        >
      {/each}
    </select>
  </div>
  <div class="grid md:grid-cols-4 grid-cols-2 gap-2">
    {#each items.slice(0, indexShow) as item}
      <div
        title={`${item.nama_barang} | ${item.material}`}
        class="bg-slate-600 rounded-lg subtle-shadow p-2 flex flex-col justify-center items-center"
      >
        <Icon
          icon="mdi:package-variant-closed-plus"
          class="drop-shadow-lg mb-1"
          width="2.5rem"
        />
        <h1 class="text-xs truncate font-bold w-full text-center">
          {item.nama_barang}
        </h1>
        <hr class="block border-b w-2/3 opacity-25 my-1" />
        <div class="flex gap-2 items-center justify-around w-full">
          <div class="text-center">
            <h1 class="text-xs">Bruto</h1>
            <h1 class="font-bold text-base">
              {parseFloat(item.bruto)}
            </h1>
          </div>
          <div class="text-center">
            <h1 class="text-xs">Hasil</h1>
            <h1 class="font-bold text-base">
              {parseFloat(item.hasil_pcs)}
            </h1>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
