import type { ApiRes, FunctionResponseShape, PaypalOrderShape } from "../interface/_interfaces";
import type { JSONFormatter } from "../interface/_types";

import dotenv from "dotenv";
dotenv.config();

/**
 * Return An Internal API Error Object
 * @param {string} reason
 * @param {number | 500} http_error_code (Default: 500)
 * @returns Error Object To Send
 */
export const HandleError = (reason?: string, http_error_code?: number): ApiRes => {
	console.error("API_ERROR: ", http_error_code || 500, reason);
	return {
		succeed: false,
		code: http_error_code || 500,
		message: reason || "Something Went Wrong 😨"
	};
};

/**
 * Return An Internal API Success Object
 * @param {object} data
 * @param {number | 200} code (Default: 200)
 * @returns Success Object To Send
 */
export const HandleSuccess = (code?: number, data?: object): ApiRes => ({
	succeed: true,
	code: code || 200,
	data: data || undefined
});

/**
 * Decrypt The Request Obj From API
 * @param {Body} body
 * @returns {JSONFormatter} An object with the validity of the req and if valid the request data
 */
export const DecryptRequest = <T>(body: string): JSONFormatter<T> => {
	if (typeof body === "object") return body;
	if (typeof body === "string") return JSON.parse(body);
	return null;
};

/**
 * Parse The Request Obj From API
 * @param {Body} body
 * @returns {PaypalOrderShape} An object with the validity of the req and if valid the request data
 */
export const ParseRequest = (body: string): FunctionResponseShape<PaypalOrderShape> => {
	const data = DecryptRequest<PaypalOrderShape>(body);
	if (!data) return { success: false };

	const CustomerOrder = data["CustomerOrder"];
	if (!CustomerOrder) return { success: false };

	let IsGood = true;
	Object.values(CustomerOrder).forEach((val: string) => {
		if (!val || val.toString().trim().length <= 0) IsGood = false;
	});
	if (!IsGood) return { success: false };

	return { success: true, data: CustomerOrder };
};

/**
 * Check If The GPG Key is the sama as the Server One
 * @param {string} AuthKey
 * @returns {FunctionResponseShape} Success Object
 */
export const Authentificator = (AuthKey: string): FunctionResponseShape => {
	const RightKey = process.env.VITE_API_SECRET_KEY;

	if (!AuthKey || !RightKey) return { success: false };
	if (AuthKey.trim().length <= 0 || RightKey.trim().length <= 0) return { success: false };
	if (AuthKey !== RightKey) return { success: false };
	return { success: true };
};

/**
 * Randomly Suffle the Array in params
 * @param {Array} ArrayToShuffle
 * @returns The randomly shuffled array
 */
export const shuffleArray = <T>(ArrayToShuffle: T[]): T[] =>
	ArrayToShuffle.sort(() => Math.random() - 0.5);

export const CreateTombolaId = (OrderId: string) => {
	// Ex OrderId "8XN35426C6936841M"
	const FlattenedId = OrderId.slice(0, 8);
	const ShuffledId = shuffleArray(FlattenedId.split("")).join("");
	return ShuffledId;
};
