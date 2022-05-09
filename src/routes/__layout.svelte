<script lang="ts">
	// UI
	import Metatags from "$lib/components/Metatags.svelte";
	import { onMount } from "svelte";
	import { ToastContainer, FlatToast } from "svelte-toasts";
	import "../styles/app.css";

	onMount(() => {
		console.log(
			"%cCode Source: https://github.com/Ilingu/tombola-lycee",
			`
			text-transform: uppercase;
			background: #000;
			color: #FFF;
			font-weight: bold;
			font-size: 1.75rem;
			padding: 5px 20px;
			text-shadow: -1px -1px 0 rgba(251, 1, 252, 0.5),
									1px 1px 0 rgba(4, 251, 246, 0.5);
`
		);
	});
</script>

<Metatags />
<main class="flex h-screen flex-col">
	<slot />
	<ToastContainer placement="top-right" let:data>
		<FlatToast {data} />
	</ToastContainer>
</main>
