import React, { useEffect, useState } from "react";
import OrderFilters from "./OrderFilters";
import OrderTable from "./OrderTable";
import { getOrders } from "../services/orderService";

const OrderHistory = ({ role }) => {
  const [filters, setFilters] = useState({
    orderId: "",
    email: "",
    status: "",
    page: 1,
  });

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    const res = await getOrders({ ...filters, role });
    setData(res.orders);
    setTotalPages(res.totalPages);
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