import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from '../../config';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('UserId'); // Retrieve userId from local storage
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(`${BASE_URL}/api/myorders`, 
          { userId: userId }, // Include userId in the request body
          { headers: { Authorization: `Bearer ${token}` } } // Add token to headers
        );
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Product: {order.productName}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Status: {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrder;
