import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useCart } from "./CartContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { clearCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  // 1. Place a new order
  const placeOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/orders", orderData);
      if (response.data.success) {
        setLastOrder(response.data.orderId);
        clearCart();
        return { success: true, orderId: response.data.orderId };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Order placement failed.";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch all orders (For Admin or History)
  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // 3. Update Order Status (NEW)
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      if (response.data) {
        // Update local state so UI reflects the change immediately
        setOrders((prevOrders) =>
          prevOrders.map((o) => (o._id === orderId ? { ...o, status } : o)),
        );
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update status";
      return { success: false, message: msg };
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        placeOrder,
        fetchAllOrders,
        updateOrderStatus, // Added
        orders,
        setOrders, // Added to allow local filtering/pinning
        loading,
        error,
        lastOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrders = () => useContext(OrderContext);
