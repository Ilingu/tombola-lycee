import { writable } from "svelte/store";
import type { PaypalOrderShape } from "./interface/interface";

export const PaypalOrder = writable<PaypalOrderShape>();
