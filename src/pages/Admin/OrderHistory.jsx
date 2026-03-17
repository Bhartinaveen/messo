import React, { useEffect, useState } from "react";
import OrderFilters from "../../components/OrderFilters";
import OrderTable from "../../components/OrderTable";
import { getOrders } from "../../services/orderService";

const OrderHistory = () => {
  const [filters, setFilters] = useState({
    orderId: "",
    email: "",
    status: "",
    page: 1,
  });

  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const res = await getOrders({ ...filters, role: "admin" });
    setData(res.orders || []);
  };

  useEffect(() => {
    fetchOrders();
  }, [filters.page]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Order History</h1>

      <OrderFilters
        filters={filters}
        setFilters={setFilters}
        onSearch={fetchOrders}
      />

      <OrderTable data={data} />
    </div>
  );
};

export default OrderHistory;