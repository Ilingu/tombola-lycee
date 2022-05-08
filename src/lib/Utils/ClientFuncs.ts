import { toasts } from "svelte-toasts";
import type { ToastProps } from "svelte-toasts/types/common";
import type { ToastType } from "$lib/interface/types";
import { PaypalOrder } from "$lib/store";
import type { PaypalOrderShape } from "$lib/interface/interface";
import { goto } from "$app/navigation";

/**
 * Create A Notification in FrontEnd
 * @param {string} message
 * @param {ToastType} type
 * @param {number} duration
 * @param {string} description
 * @returns {ToastProps} Return the intanciate notification
 */
export const PushToast = (
	message: string,
	type: ToastType,
	duration: number,
	description?: string
): ToastProps => toasts.add({ title: message, duration, type, description: description || "" });

/**
 * Return the current value of the Order Store
 * @returns {PaypalOrderShape} Return An Paypal Order
 */
export const PaypalOrderSnapshot = (): Promise<PaypalOrderShape> =>
	new Promise((res: (value: PaypalOrderShape) => void) => {
		const unSub = PaypalOrder.subscribe((order) => res(order));
		unSub();
	});

/**
 * Push a new route on the client
 * @param {string} route
 * @param {boolean} replaceState
 */
export const RouterPush = (route: string, replaceState = true) => {
	goto(route.startsWith("/") ? route : `/${route}`, { replaceState });
};

// import.meta.env.VITE_API_SECRET_KEY
