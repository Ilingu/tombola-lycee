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

export interface ApiRes {
	succeed: boolean;
	code: number;
	data?: object;
	message?: string;
}
