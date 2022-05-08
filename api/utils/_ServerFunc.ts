import { ApiRes } from "../interface/_interfaces";

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
