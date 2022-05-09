import type { VercelResponse, VercelRequest } from "@vercel/node";
// DB
import prisma from "../utils/_prisma";
// Utils
import type { ApiRes } from "../interface/_interfaces";
import { HandleError, HandleSuccess } from "../utils/_ServerFunc";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Utils Func
	const Respond = (ResData: ApiRes) => {
		res.status(ResData.code).json(ResData);
	};

	try {
		// Request Verifier
		const { method } = req;
		if (method !== "GET") return Respond(HandleError("Only accept GET req", 400)); // ❌

		const NumberOfTickets = await prisma.tickets.count({});
		return Respond(HandleSuccess(200, { RaisedAmount: NumberOfTickets * 2 }));
	} catch (err) {
		return Respond(HandleError(err));
	}
}
