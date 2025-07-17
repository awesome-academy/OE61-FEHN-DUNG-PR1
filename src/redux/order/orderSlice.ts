import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@/type";

interface OrderState {
    orders: Order[];
    currentOrder: Order | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    currentOrder: null,
    isLoading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        createOrderStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        createOrderSuccess: (
            state,
            action: PayloadAction<{ order: Order }>
        ) => {
            state.orders.push(action.payload.order);
            state.currentOrder = action.payload.order;
            state.isLoading = false;
            state.error = null;
        },
        createOrderFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        },
        setOrdersStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setOrdersSuccess: (
            state,
            action: PayloadAction<{ orders: Order[] }>
        ) => {
            state.orders = action.payload.orders;
            state.isLoading = false;
            state.error = null;
        },
        setOrdersFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearOrders: (state) => {
            state.orders = [];
            state.currentOrder = null;
            state.isLoading = false;
            state.error = null;
        }
    }
});


export const {
    createOrderStart,
    createOrderSuccess,
    createOrderFailure,
    clearCurrentOrder,
    setOrdersStart,
    setOrdersSuccess,
    setOrdersFailure,
    clearOrders
} = orderSlice.actions;

export default orderSlice.reducer;