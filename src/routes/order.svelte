<script lang="ts">
	import type { PaypalOrderShape } from "$lib/interface/interface";

	import { PaypalOrder } from "$lib/store";

	let InvoiceRaw: PaypalOrderShape;
	PaypalOrder.subscribe((order) => {
		if (!order) return;
		InvoiceRaw = order;
	});
</script>

<article class="middle w-full" />
