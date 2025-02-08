import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
interface Product {
  id: number;
  name: string;
  price: number;
  thumb: string;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice += action.payload.price * action.payload.quantity;
        toast.info(`${existingItem.name} কার্ট এ পরিমাণ যুক্ত করা হয়েছে!`); 
        
      } else {
        state.items.push(action.payload);
        toast.success(`${action.payload.name} কার্ট এ যুক্ত হয়েছে!`);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        toast.warning(`${item.name} কার্ট থেকে রিমুভ করা হয়েছে!`);
      }
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
        toast.info(`${item.name} কার্ট এ পরিমাণ যুক্ত করা হয়েছে!`); 
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;
        toast.warning(`${item.name} কার্ট এ পরিমাণ কম করা হয়েছে!`); 
      }
      // No removal here; user must explicitly click the 'remove' button
    },


    clearCart: (state) => {
      toast.error("কার্ট রিসেট করা হয়েছে!");
      state.items = [];
    },
    clearCart2: (state) => {
      state.items = [];
    },
  },
});
// Selector to get total quantity

export const selectTotalQuantity = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.totalPrice, 0);

export const { addToCart, removeFromCart, clearCart, clearCart2, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
