<script lang="ts">
  import Icon from "@iconify/svelte";
  import { navigate } from "svelte-routing";
  import { slide } from "svelte/transition";
  import CategoryItems from "./CategoryItems.svelte";
  import SearchForm from "./SearchForm.svelte";
  import SidebarBrand from "./SidebarBrand.svelte";

  let categoryShown: boolean = false;
  function close(event: CustomEvent) {
    categoryShown = !categoryShown;
    navigate(event.detail.pathname, { replace: true });
  }
</script>

<div
  class="col-span-2 bg-slate-700 2xl:p-7 p-5 border-r border-slate-600 xl:block hidden"
>
  <SidebarBrand />
  <SearchForm className="mb-10" />
  <CategoryItems on:close={close} />
</div>

<div
  class="bg-slate-700 px-7 py-3 flex items-center justify-between fixed top-0 inset-x-0 z-10 xl:hidden gap-2 shadow-sidebar"
>
  <Icon icon="material-symbols:warehouse-outline" class="text-3xl" />
  <h1 class="sm:block hidden font-bold">Monitor Gudang</h1>
  <SearchForm className="flex items-center flex-grow" />
  <div class="relative">
    <button
      on:click={() => (categoryShown = !categoryShown)}
      title="Kategori"
      class="btn"
    >
      <Icon icon="pepicons-pop:label" class="xl:text-sm text-base" />
    </button>
    {#if categoryShown}
      <div
        transition:slide
        class="absolute bg-slate-500 whitespace-nowrap right-0 top-10 p-3 rounded"
      >
        <CategoryItems on:close={close} />
      </div>
    {/if}
  </div>
</div>

<style>
  .shadow-sidebar {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 15px;
  }
</style>
