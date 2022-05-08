import type { VercelResponse, VercelRequest } from "@vercel/node";
import type { ApiRes } from "../interface/_interfaces";

import { HandleError, HandleSuccess, Authentificator, ParseRequest } from "../utils/_ServerFunc";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Utils Func
	const Respond = (ResData: ApiRes) => {
		res.status(ResData.code).json(ResData);
	};

	try {
		// Request Verifier
		const { method, headers, body } = req;
		const AuthKey = headers?.authorization?.toString() || undefined;
		if (!headers || !AuthKey)
			return Respond(HandleError("Missing User Authentification Token", 400)); // ❌
		if (method !== "POST") return Respond(HandleError("Only accept POST req", 400)); // ❌

		// Parse Req
		const { success: NoBodyErr, data: CustomerOrder } = await ParseRequest(body);
		if (!NoBodyErr) return Respond(HandleError("Bad Arguments", 400)); // ❌

		// Authentificate
		const { success: AuthSucceed } = Authentificator(AuthKey);
		if (!AuthSucceed) return Respond(HandleError("Wrong Auth Key", 400)); // ❌

		return Respond(HandleSuccess());
	} catch (err) {
		return Respond(HandleError(err));
	}
}
