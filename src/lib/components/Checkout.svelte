<script lang="ts">
	import { onMount } from "svelte";
	import { loadScript } from "@paypal/paypal-js";
	import { CallApi, PushToast, RouterPush } from "$lib/Utils/ClientFuncs";
	import { PaypalOrder } from "$lib/store";

	onMount(() => {
		LoadPaypal();
	});

	const LoadPaypal = async () => {
		try {
			const Paypal = await loadScript({
				"client-id": import.meta.env.DEV ? "test" : import.meta.env.VITE_PAYPAL_ID,
				currency: "EUR"
			});
			if (!Paypal) throw new Error("No Paypal Instance");

			await Paypal.Buttons({
				createOrder: (_, actions) => {
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									value: "2"
								}
							}
						]
					});
				},
				onApprove: async (_, actions) => {
					// Send Tx
					const OrderDetails = await actions.order.capture();
					// Parse Tx
					const {
						id: OrderId,
						payer: {
							name: { given_name: firstName, surname: lastName },
							email_address: CustomerEmail,
							phone: {
								phone_number: { national_number: CustomerPhone }
							}
						}
					} = OrderDetails;
					const CustomerOrder = { OrderId, firstName, lastName, CustomerEmail, CustomerPhone };
					const { succeed: ReqSuccess, data } = await CallApi({
						URI: "/api/tickets/add",
						METHOD: "POST",
						body: { CustomerOrder }
					});
					if (!ReqSuccess) {
						PushToast(
							"Erreur Lors de l'achat!",
							"error",
							10000,
							"Je n'ai pas pu valider la transaction"
						);
						return;
					}
					// Set Tx To Store
					PaypalOrder.set(data.CustomerDBOrder);
					RouterPush("/order");
				},
				onError: (err) => {
					PushToast(
						"Erreur Lors de l'achat!",
						"error",
						10000,
						"Je n'ai pas pu valider la transaction"
					);
					console.log("Tx Failed", err);
				}
			}).render("#paypal-btn");
		} catch (err) {
			PushToast(
				"Erreur Paypal!",
				"error",
				10000,
				"Je n'ai pas pu initialiser Paypal: Rafraichit la page!"
			);
			console.error("Failed to load the PayPal JS SDK script", err);
		}
	};
</script>

<div id="paypal-btn" class="w-10/12" />
