import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increment the quantity if the item already exists
      } else {
        state.push({ ...newItem, quantity: 1 }); // Add as a new item with a quantity of 1
      }
    },
    removeItem: (state, action) => {
      const productIdToRemove = action.payload;
      const itemIndexToRemove = state.findIndex(
        (item) => item.id === productIdToRemove
      );
      if (itemIndexToRemove !== -1) {
        state.splice(itemIndexToRemove, 1);
      }
    },
    removeQuantity: (state, action) => {
      const productIdToRemove = action.payload;
      const existingItem = state.find((item) => item.id === productIdToRemove);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else if (existingItem && existingItem.quantity === 1) {
        // If the quantity is 1, remove the item from the cart
        const itemIndexToRemove = state.findIndex(
          (item) => item.id === productIdToRemove
        );
        if (itemIndexToRemove !== -1) {
          state.splice(itemIndexToRemove, 1);
        }
      }
    },
    increaseQuantity: (state, action) => {
      const productIdToIncrease = action.payload;
      const existingItem = state.find(
        (item) => item.id === productIdToIncrease
      );

      existingItem.quantity += 1;
    },
    // ...other reducer actions
  },
});

export const { addItem } = cartSlice.actions;
export const { removeItem } = cartSlice.actions;
export const { removeQuantity } = cartSlice.actions;
export const { increaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
