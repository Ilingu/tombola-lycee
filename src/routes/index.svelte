<script context="module" lang="ts">
	import type { ApiRes } from "$lib/interface/interface";

	/** @type {import('./index').Load} */
	export async function load({ fetch }) {
		const APIUrl = `${
			import.meta.env.DEV ? "http://localhost:3000" : "https://lycee-mb-tombola.vercel.app"
		}/api/tickets/raised-amount`;
		const APIRequest = await fetch(APIUrl);

		let RaisedAmount: number;
		if (APIRequest.ok) {
			const Response: ApiRes<{ RaisedAmount: number }> = await APIRequest.json();
			RaisedAmount = Response?.data?.RaisedAmount || null;
		}

		return {
			status: APIRequest.status,
			props: {
				RaisedAmount
			}
		};
	}
</script>

<script lang="ts">
	import Checkout from "$lib/components/Checkout.svelte";
	export let RaisedAmount: number;
</script>

<article class="middle w-full">
	<header class="flex flex-col items-center gap-y-3">
		<img src="/IMG/logo-tombola.png" alt="Logo Lycée" class="w-20 rounded-md" />
		<h1 class="font-bold xs:text-3xl text-xl text-center text-secondary-whither">
			Tombola 2022 du Lycée du Mont-Blanc ✨
		</h1>
		<h1 class="text-xl xs:text-3xl font-semibold">Déjà <span class="text-secondary-main">{RaisedAmount}€</span> de récolté! 💖</h1>
	</header>
	<form
		class="flex flex-col items-center justify-center w-[95%] gap-y-3 py-5 ring-2 ring-secondary-main rounded"
	>
		<h1 class="text-3xl text-secondary-whither">
			S'inscrire <i class="fa-solid fa-arrow-right-long" />
			<span class="font-bold text-secondary-main font-mono text-4xl">2€</span>
		</h1>
		<Checkout />
	</form>
</article>
