<script lang="ts">
  import Icon from "@iconify/svelte";
  import { categoryItems, selectedCategory } from "@lib/store";
  import { navigate } from "svelte-routing";
  function categoryHandler(category: string) {
    $selectedCategory = category;
    let pathname = category.toLowerCase().replace(" ", "-");
    if (pathname === "raw-material") pathname = "/";
    navigate(pathname, { replace: true });
  }
</script>

<div>
  <div class="xl:flex hidden items-center gap-2 mb-2">
    <Icon icon="iconamoon:category-light" />
    <h1 class="font-semibold">Kategori</h1>
  </div>
  <div class="xl:ml-5">
    {#each $categoryItems as category}
      <button
        on:click={() => categoryHandler(category)}
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
