import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
export interface Product {
  id: number;
  thumb: string;
  name: string;
  price: number;
}

export interface WishlistState {
  items: Product[];
}

const loadWishlistFromLocalStorage = (): WishlistState => {
  try {
    const serializedState = localStorage.getItem('wishlist');
    return serializedState ? JSON.parse(serializedState) : { items: [] };
  } catch (error) {
    console.error('Could not load wishlist from localStorage:', error);
    return { items: [] };
  }
};

const saveWishlistToLocalStorage = (wishlist: WishlistState) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  } catch (error) {
    console.error('Could not save wishlist to localStorage:', error);
  }
};

const initialState: WishlistState = loadWishlistFromLocalStorage();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<Product>) {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToLocalStorage(state);
        toast.success(`${action.payload.name} পছন্দের এ যুক্ত হয়েছে!`); 
      }
      else {
        toast.warning(`${action.payload.name} পছন্দের এ যুক্ত হয়ে আছে!`);
      }
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlistToLocalStorage(state);
    },
    clearWishlist(state) {
      state.items = [];
      saveWishlistToLocalStorage(state);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
