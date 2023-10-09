<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Link, Router } from "svelte-routing";
  import { slide } from "svelte/transition";
  import CategoryMenu from "./category-menu.svelte";
  import SearchForm from "./search-form.svelte";

  let show: boolean = false;
  const items = [
    "Raw Material",
    "Press",
    "Tooling",
    "WIP",
    "Finish Good",
    "Material Cust",
  ];
  function toggleShow() {
    if (show) show = !show;
  }
</script>

<!-- Sidebar -->
<div
  class="col-span-2 bg-slate-700 2xl:p-7 p-5 border-r border-slate-600 xl:block hidden"
>
  <div class="mb-24">
    <h2 class="font-light text-sm">Aplikasi</h2>
    <h1 class="text-lg font-bold">Monitor Gudang</h1>
  </div>
  <SearchForm className="mb-10" />
  <Router>
    <div class="xl:flex hidden items-center gap-2 mb-2">
      <Icon icon="iconamoon:category-light" />
      <h1 class="font-semibold">Kategori</h1>
    </div>
    {#each items as item}
      <Link let:active to={"/" + item.toLowerCase().replace(" ", "-")}>
        <CategoryMenu {active} {item} />
      </Link>
    {/each}
  </Router>
</div>
<!-- End of  Sidebar -->

<!-- Mobile Navbar -->
<div
  class="bg-slate-700 xl:px-7 px-3 py-3 flex items-center justify-between fixed top-0 inset-x-0 z-10 xl:hidden gap-2 shadow-sidebar"
>
  <Icon icon="material-symbols:warehouse-outline" class="text-3xl" />
  <h1 class="sm:block hidden font-bold">Monitor Gudang</h1>
  <SearchForm className="flex items-center flex-grow" />
  <div class="relative">
    <button on:click={() => (show = !show)} title="Kategori" class="btn">
      <Icon icon="pepicons-pop:label" class="xl:text-sm text-base" />
    </button>
    {#if show}
      <div
        transition:slide
        class="absolute bg-slate-500 whitespace-nowrap right-0 top-10 p-3 rounded"
      >
        <Router>
          {#each items as item}
            <Link
              on:click={toggleShow}
              let:active
              to={"/" + item.toLowerCase().replace(" ", "-")}
            >
              <CategoryMenu {active} {item} />
            </Link>
          {/each}
        </Router>
      </div>
    {/if}
  </div>
</div>

<!-- End of Mobile Navbar -->

<style>
  .shadow-sidebar {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 15px;
  }
</style>
