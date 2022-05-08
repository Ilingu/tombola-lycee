import { writable } from "svelte/store";
import type { TicketsShape } from "./interface/interface";

export const PaypalOrder = writable<TicketsShape>();
