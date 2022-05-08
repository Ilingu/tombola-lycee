<script lang="ts">
	import type { TicketsShape } from "$lib/interface/interface";
	import { PaypalOrder } from "$lib/store";

	let InvoiceRaw: TicketsShape;
	PaypalOrder.subscribe((order) => {
		if (!order) return;
		InvoiceRaw = order;
	});
</script>

<article class="middle w-full">
	<h1 class="font-bold text-2xl text-center">Merci de soutenir le lycée! ✨</h1>
	{#if !!InvoiceRaw}
		<div
			id="CustomerOrder"
			class="bg-primary-500 ring-2 ring-primary-500 rounded-lg px-5 w-full bg-opacity-70 grid grid-cols-12 gap-y-3 pb-10 
			pt-20 relative overflow-scroll"
		>
			<h2 class="-mb-5 top-2 left-2 text-lg absolute">Votre Commande:</h2>
			<img src="/IMG/favicon.png" alt="logo lycee" class="w-16 absolute top-2 right-2 rounded-md" />

			<div class="text-gray-300 text-xl col-span-3">Ticket</div>
			<div class="text-primary-50 font-bold text-xl font-mono col-span-9">
				<i class="fa-solid fa-arrow-right-long" />
				{InvoiceRaw?.TicketId || "None"}
			</div>
			<div class="text-gray-300 text-xl col-span-3">Prénom</div>
			<div class="text-primary-50 font-bold text-xl font-mono col-span-9">
				<i class="fa-solid fa-arrow-right-long" />
				{InvoiceRaw?.firstName || "None"}
			</div>
			<div class="text-gray-300 text-xl col-span-3">Nom</div>
			<div class="text-primary-50 font-bold text-xl font-mono col-span-9">
				<i class="fa-solid fa-arrow-right-long" />
				{InvoiceRaw?.lastName || "None"}
			</div>
			<div class="text-gray-300 text-xl col-span-3">Email</div>
			<div class="text-primary-50 font-bold text-xl font-mono col-span-9">
				<i class="fa-solid fa-arrow-right-long" />
				{InvoiceRaw?.email || "None"}
			</div>
			<div class="text-gray-300 text-xl col-span-3">Phone</div>
			<div class="text-primary-50 font-bold text-xl font-mono col-span-9">
				<i class="fa-solid fa-arrow-right-long" />
				{InvoiceRaw?.phone || "None"}
			</div>
		</div>
		<button
			on:click={() => window.print()}
			class="-mt-4 text-lg bg-primary-900 rounded-md py-2 px-8 hover:bg-[#1f3034] transition-all"
			><i class="fa-solid fa-print" /> Imprimer</button
		>
	{/if}
</article>
