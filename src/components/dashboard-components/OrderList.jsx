import React, { useState } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState([
    {
      id: "#ORD-1001",
      customer: "John Doe",
      status: "Processing",
      amount: "$120",
      date: "12 Jan 2026",
      phone: "01741899095",
      address: "123 Main St, Cityville",
      email: "john@example.com",
      items: [
        { productName: "Product A", size: "M", quantity: 2, totalPrice: "$50" },
        { productName: "Product B", size: "L", quantity: 1, totalPrice: "$70" },
      ],
      pinned: false,
    },
    {
      id: "#ORD-1002",
      customer: "Sarah Smith",
      status: "Shipped",
      amount: "$89",
      date: "13 Jan 2026",
      phone: "01741234567",
      address: "456 Park Ave, Townsville",
      email: "sarah@example.com",
      items: [
        { productName: "Product C", size: "S", quantity: 1, totalPrice: "$89" },
      ],
      pinned: false,
    },
    {
      id: "#ORD-1003",
      customer: "Alex Brown",
      status: "Pending",
      amount: "$45",
      date: "14 Jan 2026",
      phone: "01749876543",
      address: "789 High St, Villagetown",
      email: "alex@example.com",
      items: [
        { productName: "Product D", size: "M", quantity: 3, totalPrice: "$45" },
      ],
      pinned: false,
    },
    {
      id: "#ORD-1004",
      customer: "Alex Brown",
      status: "Returned",
      amount: "$45",
      date: "14 Jan 2026",
      phone: "01749876543",
      address: "789 High St, Villagetown",
      email: "alex@example.com",
      items: [
        { productName: "Product D", size: "M", quantity: 3, totalPrice: "$45" },
      ],
      pinned: false,
    },
    {
      id: "#ORD-1005",
      customer: "Alex Brown",
      status: "Pending",
      amount: "$45",
      date: "14 Jan 2026",
      phone: "01749876543",
      address: "789 High St, Villagetown",
      email: "alex@example.com",
      items: [
        { productName: "Product D", size: "M", quantity: 3, totalPrice: "$45" },
      ],
      pinned: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const updateStatus = (id, newStatus) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    setSelectedOrder(updated.find((o) => o.id === id));
  };

  const filteredOrders = orders.filter((order) => {
    const matchSearch = order.customer
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getBadgeClass = (status) => {
    switch (status) {
      case "Shipped":
        return "bg-success";
      case "Processing":
        return "bg-primary";
      case "Pending":
        return "bg-warning text-dark";
      case "Cancelled":
        return "bg-danger";
      case "Returned":
        return "bg-secondary";
      default:
        return "bg-info";
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Order Management</h2>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-8">
          <input
            className="form-control"
            placeholder="Search customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
          </select>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="d-none d-md-flex row fw-bold bg-light p-3 border rounded-top m-0">
        <div className="col-md-2">Order ID</div>
        <div className="col-md-3">Customer</div>
        <div className="col-md-2">Amount</div>
        <div className="col-md-2 text-center">Status</div>
        <div className="col-md-3 text-end">Action</div>
      </div>

      {/* Orders */}
      <div className="shadow-sm">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="row m-0 p-3 border-bottom bg-white flex-column flex-md-row"
          >
            {/* Order */}
            <div className="col-12 col-md-2 fw-bold text-primary">
              {order.id}
              <div className="d-md-none small text-muted">{order.date}</div>
            </div>

            {/* Customer */}
            <div className="col-12 col-md-3 mt-2 mt-md-0">
              <div className="fw-bold">{order.customer}</div>
              <div className="small">{order.phone}</div>
              <div className="small">{order.email}</div>
              <div className="small text-muted">{order.address}</div>
            </div>

            {/* Amount */}
            <div className="col-12 col-md-2 mt-2 mt-md-0 fw-bold text-success">
              {order.amount}
            </div>

            {/* Status */}
            <div className="col-12 col-md-2 mt-2 mt-md-0 text-start text-md-center">
              <span className={`badge ${getBadgeClass(order.status)}`}>
                {order.status}
              </span>
            </div>

            {/* Action */}
            <div className="col-12 col-md-3 mt-3 mt-md-0 text-start text-md-end">
              <div className="d-inline-block">
                <button
                className="btn btn-dark btn-sm w-100 w-md-auto d-block"
                onClick={() => setSelectedOrder(order)}
              >
                View Details
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedOrder.id}</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedOrder(null)}
                />
              </div>

              <div className="modal-body">
                <h6 className="fw-bold">Customer Info</h6>
                <p className="mb-1">{selectedOrder.customer}</p>
                <p className="mb-1 small">{selectedOrder.email}</p>
                <p className="mb-1 small">{selectedOrder.phone}</p>
                <p className="small text-muted">{selectedOrder.address}</p>

                <h6 className="fw-bold mt-3">Update Status</h6>
                <select
                  className="form-select d-inline-block w-auto"
                  value={selectedOrder.status}
                  onChange={(e) =>
                    updateStatus(selectedOrder.id, e.target.value)
                  }
                >
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                  <option>Returned</option>
                </select>

                <hr />

                <h6 className="fw-bold">Items</h6>
                {selectedOrder.items.map((item, i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between border-bottom py-2"
                  >
                    <div>
                      <div className="fw-bold small">
                        {item.productName}
                      </div>
                      <div className="small text-muted">
                        Size: {item.size} | Qty: {item.quantity}
                      </div>
                    </div>
                    <strong>{item.totalPrice}</strong>
                  </div>
                ))}

                <div className="text-end mt-3 fw-bold">
                  Total: {selectedOrder.amount}
                </div>

                
              </div>

              <div className="modal-footer">
                <div className="d-inline-block">
                  <button
                  className="btn btn-secondary w-100"
                  onClick={() => setSelectedOrder(null)}
                >
                  Done
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
