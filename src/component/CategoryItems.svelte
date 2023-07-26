<script lang="ts">
  import Icon from "@iconify/svelte";
  import { categoryItems, selectedCategory } from "../lib/store";
</script>

<div>
  <div class="flex items-center gap-2 mb-2">
    <Icon icon="iconamoon:category-light" />
    <h1 class="font-semibold">Kategori</h1>
  </div>
  <div class="ml-5">
    {#each $categoryItems as category}
      <button
        on:click={() => ($selectedCategory = category)}
        class:active={$selectedCategory === category}
        class="flex gap-2 items-center mb-2 duration-200 hover:text-red-500 active:text-red-700 focus:text-red-500"
      >
        <Icon icon="pepicons-pop:label" />
        <h1 class="flex-grow">{category}</h1>
      </button>
    {/each}
  </div>
</div>

<style>
  .active {
    @apply text-red-500;
  }
</style>
