import type { VercelResponse, VercelRequest } from "@vercel/node";
import type { ApiRes } from "../interface/_interfaces";

import { HandleError, HandleSuccess } from "../utils/_ServerFunc";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Utils Func
	const Respond = (ResData: ApiRes) => {
		res.status(ResData.code).json(ResData);
	};

	try {
		// Request Verifier
		const { method, headers } = req;
		if (method !== "POST") return Respond(HandleError("Only accept POST req", 400)); // ❌

		return Respond(HandleSuccess());
	} catch (err) {
		return Respond(HandleError(err));
	}
}
