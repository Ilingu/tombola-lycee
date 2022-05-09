export interface PaypalOrderShape {
	OrderId: string;
	firstName: string;
	lastName: string;
	CustomerEmail: string;
	CustomerPhone: string;
}

export interface CallApiArgs {
	URI: string;
	METHOD: "POST" | "DELETE";
	body?: BodyApiCall;
}

export interface BodyApiCall {
	CustomerOrder: PaypalOrderShape;
}

export interface ApiRes<T = object> {
	succeed: boolean;
	code: number;
	data?: T;
	message?: string;
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
