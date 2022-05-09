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
	createAt?: Date;
	updateAt?: Date;
}
