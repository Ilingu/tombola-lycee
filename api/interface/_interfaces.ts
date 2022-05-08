// Internal ApiRes
export interface ApiRes {
	succeed: boolean;
	code: number;
	data?: object;
	message?: string;
}

export interface FunctionResponseShape<T = string | object> {
	success: boolean;
	data?: T;
}

export interface PaypalOrderShape {
	OrderId: string;
	firstName: string;
	lastName: string;
	CustomerEmail: string;
	CustomerPhone: string;
}

export interface TicketsShape {
	TicketId: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}

export interface TicketsToUserShape {
	[OrderId: string]: string; // OrderID => email
}

export interface UserToTicketsShape {
	[email: string]: string[]; // email => [OrderID]
}

export interface DBShape {
	tickets: TicketsShape[];
	userToTicket: UserToTicketsShape;
	TicketToUser: TicketsToUserShape;
}
