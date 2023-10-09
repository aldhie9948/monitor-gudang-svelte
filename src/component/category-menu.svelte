<script lang="ts">
  import Icon from "@iconify/svelte";
  import { category } from "@lib/store";
  import { onMount } from "svelte";

  export let item: string;
  export let active: boolean;

  function toggleCategory(active: boolean) {
    if (!active) return;
    $category = item.toLowerCase().replace(" ", "-");
  }

  $: active, toggleCategory(active);
</script>

<div class="xl:ml-5">
  <div
    class:active
    class="flex gap-2 items-center mb-2 duration-200 hover:text-red-500 active:text-red-700 focus:text-red-500"
  >
    <Icon icon="pepicons-pop:label" />
    <h1 class="flex-grow">{item}</h1>
  </div>
</div>

<style>
  .active {
    @apply text-red-500;
  }
</style>
