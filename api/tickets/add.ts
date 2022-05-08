import type { VercelResponse, VercelRequest } from "@vercel/node";
import type {
	ApiRes,
	DBShape,
	TicketsShape,
	TicketsToUserShape,
	UserToTicketsShape
} from "../interface/_interfaces";
import {
	HandleError,
	HandleSuccess,
	Authentificator,
	ParseRequest,
	CreateTombolaId
} from "../utils/_ServerFunc";

// DB
// import database from "../DB/_DB.json";
// import { writeFile } from "fs/promises";
// import path from "path";

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

		const {
			OrderId: RawOrderId,
			firstName,
			lastName,
			CustomerEmail,
			CustomerPhone
		} = CustomerOrder;

		const OrderId = CreateTombolaId(RawOrderId);

		const CustomerDBOrder = {
			TicketId: OrderId,
			email: CustomerEmail,
			firstName,
			lastName,
			phone: CustomerPhone
		};
		// const db = database as DBShape;
		// const UserTickets = db.userToTicket[CustomerEmail] || [];

		// const NewTickets: TicketsShape[] = [...db.tickets, CustomerDBOrder];
		// const NewUserTickets: UserToTicketsShape = {
		// 	...db.userToTicket,
		// 	[CustomerEmail]: [...UserTickets, OrderId]
		// };
		// const NewTicketsUser: TicketsToUserShape = { ...db.TicketToUser, [OrderId]: CustomerEmail };

		// const NewDB: DBShape = {
		// 	tickets: NewTickets,
		// 	userToTicket: NewUserTickets,
		// 	TicketToUser: NewTicketsUser
		// };
		// const dataToWrite = JSON.stringify(NewDB);
		// await writeFile(path.join(__dirname, "../DB/_DB.json"), dataToWrite, "utf8");

		return Respond(HandleSuccess(200, { CustomerDBOrder }));
	} catch (err) {
		return Respond(HandleError(err));
	}
}
