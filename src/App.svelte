<script lang="ts">
  import RawMaterialContent from "./component/RawMaterialContent.svelte";
  import Sidebar from "./component/Sidebar.svelte";
  import UnderContruction from "./component/UnderContruction.svelte";
  import { selectedCategory } from "./lib/store";
</script>

<div class="xl:grid xl:grid-cols-12 h-screen xl:overflow-hidden">
  <Sidebar />
  <div class="xl:col-span-10 xl:mt-0 mt-10">
    {#if $selectedCategory === "Raw Material"}
      <RawMaterialContent />
    {:else}
      <UnderContruction />
    {/if}
  </div>
</div>
