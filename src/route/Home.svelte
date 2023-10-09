<script>
  import Loading from "@component/loading.svelte";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  onMount(() => {
    setTimeout(() => {
      navigate("raw-material", { replace: true });
    }, 1000);
  });
</script>

<div class="flex items-center justify-center h-full">
  <Loading />
</div>
