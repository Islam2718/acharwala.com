import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from './authSlice';
import wishlistReducer from './wishlistSlice';

// Create the Redux store
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state:', err);
    return undefined;
  }
};
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: {
    cart: {
      items: loadState() || [],
    },
  },
});
// Load cart data from localStorage


// Save cart data to localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state.cart.items);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    console.error('Could not save state:', err);
  }
};

// Configure store


// Subscribe to store updates
store.subscribe(() => {
  saveState(store.getState());
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
