import { toasts } from "svelte-toasts";
import type { ToastProps } from "svelte-toasts/types/common";
import type { ToastType } from "$lib/interface/types";
import { PaypalOrder } from "$lib/store";
import type { ApiRes, CallApiArgs, PaypalOrderShape, TicketsShape } from "$lib/interface/interface";
import { goto } from "$app/navigation";

/**
 * Check if the url is a valid one
 * @param {string} url
 * @returns {boolean} Return `true` if the url is valid
 */
export const IsValidURL = (url: string): boolean => {
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
};

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
export const PaypalOrderSnapshot = (): Promise<TicketsShape> =>
	new Promise((res: (value: TicketsShape) => void) => {
		const unSub = PaypalOrder.subscribe((order) => res(order));
		unSub();
	});

/**
 * Push a new route on the client
 * @param {string} route
 * @param {boolean} replaceState
 */
export const RouterPush = (route: string, replaceState = false) => {
	goto(route.startsWith("/") ? route : `/${route}`, { replaceState });
};

/**
 * Call internal API endpoint and Manage the result
 * @param {CallApiArgs} FetchArgs
 * @returns {ApiRes} Return Internal API Raw Response
 */
export const CallApi = async ({
	URI,
	METHOD,
	body
}: CallApiArgs): Promise<ApiRes<{ CustomerDBOrder: TicketsShape }>> => {
	try {
		const URL = encodeURI(`${window.location.origin}${URI.startsWith("/") ? URI : `/${URI}`}`);
		const AuthKey = import.meta.env.VITE_API_SECRET_KEY;
		if (!IsValidURL(URL)) throw new Error("Unvalid URL");

		// Request
		const APIRequest = await fetch(URL, {
			method: METHOD,
			body: JSON.stringify(body),
			headers: { authorization: AuthKey }
		});
		if (!APIRequest.ok) throw new Error("Request Failed");

		// Response
		const APIResponse: ApiRes<{ CustomerDBOrder: TicketsShape }> = await APIRequest.json();
		return APIResponse;
	} catch (err) {
		console.error(err);
		return { succeed: false, code: 500, message: err };
	}
};
