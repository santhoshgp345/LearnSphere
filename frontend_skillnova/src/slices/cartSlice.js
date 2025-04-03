import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : 0 
};

const cartSlice = createSlice({
    name: "cart", 
    initialState,
    reducers: {
        addToCart(state, action) {
            const course = action.payload;
            const index = state.cart.findIndex((item) => item._id === course._id);

            if (index >= 0) {
                toast.error("Course already in cart");
                return;
            }

            // Add course to cart
            state.cart.push(course);
            state.cartItems++;
            state.total += course.price;

            // Save updated state to local storage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("total", JSON.stringify(state.total));
        },

        removeFromCart(state, action) {
            const courseId = action.payload;
            const courseIndex = state.cart.findIndex((item) => item._id === courseId);

            if (courseIndex !== -1) {
                const removedCourse = state.cart[courseIndex];

                // Remove course from cart
                state.cart.splice(courseIndex, 1);
                state.cartItems--;
                state.total -= removedCourse.price;

                // Save updated state to local storage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                localStorage.setItem("total", JSON.stringify(state.total));
            }
        },

        resestCart(state) {
            state.cart = [];
            state.cartItems = 0;
            state.total = 0;

            // Clear local storage
            localStorage.removeItem("cart");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("total");
        }
    }
});

export const { addToCart, removeFromCart, resestCart } = cartSlice.actions;
export default cartSlice.reducer;
