<script lang="ts">
	import Checkout from "$lib/components/Checkout.svelte";
</script>

<article class="middle w-full">
	<header class="flex flex-col items-center gap-y-3">
		<img src="/IMG/logo-tombola.png" alt="Logo Lycée" class="w-20 rounded-md" />
		<h1 class="font-bold text-xl text-center text-secondary-whither">
			Tombola 2022 du Lycée du Mont-Blanc ✨
		</h1>
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
