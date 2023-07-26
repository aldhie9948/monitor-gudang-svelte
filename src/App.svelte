<script lang="ts">
  import CategoryItems from "./component/CategoryItems.svelte";
  import RawMaterialContent from "./component/RawMaterialContent.svelte";
  import SearchForm from "./component/SearchForm.svelte";
  import SidebarBrand from "./component/SidebarBrand.svelte";
  import UnderContruction from "./component/UnderContruction.svelte";
  import { selectedCategory } from "./lib/store";
</script>

<div class="grid grid-cols-12 h-screen overflow-hidden">
  <div class="col-span-2 bg-slate-700 2xl:p-7 p-5 border-r border-slate-600">
    <SidebarBrand />
    <SearchForm className="mb-10" />
    <CategoryItems />
  </div>
  <div class="col-span-10">
    {#if $selectedCategory === "Raw Material"}
      <RawMaterialContent />
    {:else}
      <UnderContruction />
    {/if}
  </div>
</div>
