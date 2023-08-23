<script lang="ts">
  export let title = undefined;
  export let disabled = false;
  export let page = undefined;
  export let active = false;
</script>

<button
  type="button"
  {disabled}
  data-page={page}
  class:active
  {title}
  on:click
  class="bg-slate-600 h-8 w-8 rounded mx-0.5 duration-150 enabled:hover:bg-slate-600/50 disabled:bg-slate-800"
>
  <slot />
</button>

<style>
  .active {
    @apply bg-slate-400;
  }
</style>
