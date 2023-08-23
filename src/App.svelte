<script lang="ts">
  import RawMaterial from "@route/RawMaterial.svelte";
  import { Route, Router } from "svelte-routing";
  import Sidebar from "./component/Sidebar.svelte";
  import NotFound from "@route/NotFound.svelte";
  import MaterialCust from "@route/MaterialCust.svelte";
  import Home from "@route/Home.svelte";
  let url = "";
  let basepath = import.meta.env.VITE_BASEPATH;
</script>

<div class="xl:grid xl:grid-cols-12 h-screen xl:overflow-hidden">
  <Sidebar />
  <div class="xl:col-span-10 xl:pt-0 md:pt-16 pt-16">
    <Router {url} {basepath}>
      <Route path="/" component={Home} />
      <Route path="/raw-material" component={RawMaterial} />
      <Route path="/press" component={NotFound} />
      <Route path="/tooling" component={NotFound} />
      <Route path="/wip" component={NotFound} />
      <Route path="/finish-good" component={NotFound} />
      <Route path="/material-cust" component={MaterialCust} />
    </Router>
  </div>
</div>
