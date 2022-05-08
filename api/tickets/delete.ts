import type { VercelResponse, VercelRequest } from "@vercel/node";
import type { ApiRes } from "../interface/_interfaces";

import { HandleError } from "../utils/_ServerFunc";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Utils Func
	const Respond = (ResData: ApiRes) => {
		res.status(ResData.code).json(ResData);
	};

	try {
		// Request Verifier
		const { method } = req;
		if (method !== "DELETE") return Respond(HandleError("Only accept DELETE req", 400)); // ❌
		return Respond(HandleError("Functionnality not implemented yet", 500)); // ❌
	} catch (err) {
		return Respond(HandleError(err));
	}
}
