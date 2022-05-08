<script lang="ts">
	// UI
	import Metatags from "$lib/components/Metatags.svelte";
	import { ToastContainer, FlatToast } from "svelte-toasts";
	import "../styles/app.css";
</script>

<Metatags />
<main class="flex h-screen flex-col">
	<slot />
	<ToastContainer placement="top-right" let:data>
		<FlatToast {data} />
	</ToastContainer>
</main>

<!-- Global styling, :global(tag){} -->
<style></style>
