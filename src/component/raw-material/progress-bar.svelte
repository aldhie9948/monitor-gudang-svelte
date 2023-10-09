<script lang="ts">
  export let value: number;
  export let total: number;
  export let className: string;

  let percentage = 0;
  $: percentage = (value / total) * 100;
</script>

<div
  class="w-full bg-slate-700 rounded-full 2xl:h-5 h-4 overflow-hidden flex-grow 2xl:mb-3 mb-2"
>
  <div
    class="h-full {className} relative rounded-full"
    style="width: {isNaN(percentage) ? 0 : percentage}%"
  >
    {#if value !== 0}
      <div
        class="absolute left-1/2 top-1/2 text-xs -translate-x-1/2 -translate-y-1/2"
      >
        {parseFloat(String(percentage)).toFixed(1)}%
      </div>
    {/if}
  </div>
</div>
