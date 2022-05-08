import type { VercelResponse, VercelRequest } from "@vercel/node";
import type { ApiRes, DBShape, TicketsShape, UserToTicketShape } from "../interface/_interfaces";
import {
	HandleError,
	HandleSuccess,
	Authentificator,
	ParseRequest,
	CreateTombolaId
} from "../utils/_ServerFunc";

// DB
import db from "../DB/_DB.json";

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

		return Respond(HandleSuccess());
	} catch (err) {
		return Respond(HandleError(err));
	}
}
