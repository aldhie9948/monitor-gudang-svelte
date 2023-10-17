<script lang="ts">
  import Home from "@route/home.svelte";
  import MaterialCust from "@route/material-cust.svelte";
  import NotFound from "@route/not-found.svelte";
  import RawMaterial from "@route/raw-material.svelte";
  import { Route, Router } from "svelte-routing";
  import Sidebar from "./component/sidebar.svelte";
  let url = "";
  let basepath = import.meta.env.VITE_BASEPATH;
</script>

<svelte:head>
  <meta
    http-equiv="Cache-Control"
    content="no-cache, no-store, must-revalidate"
  />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
</svelte:head>

<div class="xl:grid xl:grid-cols-12 sm:h-screen xl:overflow-hidden">
  <Sidebar />
  <div class="xl:col-span-10 xl:pt-0 md:pt-16 pt-16 overflow-auto">
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
