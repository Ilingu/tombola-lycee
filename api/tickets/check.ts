import type { VercelResponse, VercelRequest } from "@vercel/node";
// DB
import prisma from "../utils/_prisma";
// Utils
import type { ApiRes } from "../interface/_interfaces";
import { DecryptRequest, HandleError, HandleSuccess } from "../utils/_ServerFunc";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Utils Func
	const Respond = (ResData: ApiRes) => {
		res.status(ResData.code).json(ResData);
	};

	try {
		// Request Verifier
		const { method, body } = req;
		if (method !== "POST") return Respond(HandleError("Only accept POST req", 400)); // ❌

		// Parse Req
		const Body = DecryptRequest<string>(body);
		if (
			!Body ||
			(!Body["ticket"] && !Body["email"] && !Body["firstname"] && !Body["lastname"] && !Body["tel"])
		)
			return Respond(HandleError("No Arguments", 400)); // ❌
		Object.values(Body).forEach((val) => {
			if (!val || val.toString().trim().length <= 0)
				return Respond(HandleError("Not valid Arguments", 400)); // ❌
		});

		const UserTickets = await prisma.tickets.findMany({
			where: {
				TicketId: Body["ticket"] || undefined,
				firstName: Body["firstname"] || undefined,
				lastName: Body["lastname"] || undefined,
				email: Body["email"] || undefined,
				phone: Body["tel"] || undefined
			}
		});
		return Respond(HandleSuccess(200, { UserTickets }));
	} catch (err) {
		return Respond(HandleError(err));
	}
}
