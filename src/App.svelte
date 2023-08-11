<script lang="ts">
  import RawMaterial from "@route/RawMaterial.svelte";
  import { Route, Router } from "svelte-routing";
  import Sidebar from "./component/Sidebar.svelte";
  import NotFound from "@route/NotFound.svelte";
  import MaterialCust from "@route/MaterialCust.svelte";
  let url = "";
  let basepath = import.meta.env.DEV ? "/" : "/monitor-gudang";
</script>

<div class="xl:grid xl:grid-cols-12 h-screen xl:overflow-hidden">
  <Sidebar />
  <div class="xl:col-span-10 xl:mt-0 mt-10">
    <Router {url} {basepath}>
      <Route path="/" component={RawMaterial} />
      <Route path="/press" component={NotFound} />
      <Route path="/tooling" component={NotFound} />
      <Route path="/wip" component={NotFound} />
      <Route path="/finish-good" component={NotFound} />
      <Route path="/material-cust" component={MaterialCust} />
    </Router>
  </div>
</div>
