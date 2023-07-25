<script lang="ts">
  import Icon from "@iconify/svelte";
  import { keywordSearch } from "./lib/store";
  import SearchForm from "./component/SearchForm.svelte";
  import SidebarBrand from "./component/SidebarBrand.svelte";
</script>

<div class="flex h-screen">
  <div class="w-2/12 bg-slate-700 p-7">
    <SidebarBrand />
    <SearchForm />
  </div>
  <div class="flex-grow p-7">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint a, magni
    temporibus quos maxime, voluptatem exercitationem at doloribus dicta fugit
    labore aut fugiat veritatis. Odit possimus explicabo sequi illo aliquid.
  </div>
</div>
