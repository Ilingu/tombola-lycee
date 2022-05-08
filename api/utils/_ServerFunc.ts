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
 * Parse The Request Obj From API
 * @param {Body} request
 * @returns {ParseReqShape} An object with the validity of the req and if valid the request data
 */
export const ParseRequest = async (
	body: string
): Promise<FunctionResponseShape<PaypalOrderShape>> => {
	let data: JSONFormatter;
	if (typeof body === "object") data = body;
	if (typeof body === "string") data = JSON.parse(body);
	if (!body || !data) return { success: false };

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
