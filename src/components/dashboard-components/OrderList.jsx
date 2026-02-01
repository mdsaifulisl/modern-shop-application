import React, { useState, useEffect, useMemo } from "react";
import { FaPrint, FaSearch } from "react-icons/fa";
import { useOrders } from "../../context/OrderContext";

const OrderList = () => {
  const { orders, fetchAllOrders, loading, updateOrderStatus } = useOrders();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  // Handle status update
  const handleStatusChange = async (id, newStatus) => {
    const result = await updateOrderStatus(id, newStatus);
    if (result.success) {
      // If the modal is open for this specific order, update the modal view too
      if (selectedOrder?._id === id) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
    } else {
      alert("Failed to update status: " + result.message);
    }
  };

  // Optimization: useMemo prevents recalculating filters unless orders/search changes
  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const fullName = `${order.firstName || ""} ${order.lastName || ""}`.toLowerCase();
        const orderId = (order._id || "").toLowerCase();
        const search = searchTerm.toLowerCase();

        const matchSearch = fullName.includes(search) || orderId.includes(search);
        const matchStatus = statusFilter === "All" || order.status === statusFilter;
        
        return matchSearch && matchStatus;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders, searchTerm, statusFilter]);

  const handlePrint = () => window.print();

  const getBadgeClass = (status) => {
    const classes = {
      Shipped: "bg-success",
      Processing: "bg-primary",
      Pending: "bg-warning text-dark",
      Cancelled: "bg-danger",
      Returned: "bg-secondary",
      Delivered: "bg-info",
    };
    return classes[status] || "bg-info";
  };

  // Fixed the return statement structure
  return (
    <div className="container-fluid mt-4 mb-5">
      {loading && orders.length === 0 ? (
        <div className="text-center mt-5 p-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2 text-muted">Loading orders...</p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold m-0 text-uppercase tracking-wider">
              Order Management
            </h5>
            <button className="btn btn-outline-dark btn-sm shadow-sm" onClick={handlePrint}>
              <FaPrint className="me-2" /> Print Report
            </button>
          </div>

          {/* Filters */}
          <div className="row g-3 mb-4">
            <div className="col-md-8">
              <div className="input-group shadow-sm">
                <span className="input-group-text bg-white border-end-0">
                   <FaSearch className="text-muted" />
                </span>
                <input
                  className="form-control border-start-0"
                  placeholder="Search customer or Order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select
                className="form-select shadow-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Returned">Returned</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="d-none d-md-flex row fw-bold bg-dark text-white p-3 m-0">
              <div className="col-md-1">Image</div>
              <div className="col-md-2">Order ID</div>
              <div className="col-md-3">Customer</div>
              <div className="col-md-2">Amount</div>
              <div className="col-md-2 text-center">Status</div>
              <div className="col-md-2 text-end">Action</div>
            </div>

            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="row m-0 p-3 border-bottom align-items-center bg-white hover-light"
                >
                  <div className="col-3 col-md-1">
                    <img
                      src={order.orderItems?.[0]?.image || "https://via.placeholder.com/50"}
                      alt="preview"
                      className="rounded border"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </div>

                  <div className="col-9 col-md-2 fw-bold text-primary small">
                    #{order._id?.slice(-5)}
                  </div>

                  <div className="col-12 col-md-3 mt-2 mt-md-0">
                    <div className="fw-bold">{order.firstName} {order.lastName}</div>
                    <div className="small text-muted">{order.phone}</div>
                  </div>

                  <div className="col-4 col-md-2 fw-bold text-success mt-2 mt-md-0">
                    ৳{order.total}
                  </div>

                  <div className="col-4 col-md-2 text-md-center mt-2 mt-md-0">
                    <span className={`badge ${getBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="col-4 col-md-2 text-md-end mt-2 mt-md-0">
                    <button
                      className="btn btn-dark btn-sm px-3 w-100 w-md-auto shadow-sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-5 text-center text-muted">No orders found.</div>
            )}
          </div>
        </>
      )}

      {/* Modal - Details */}
      {selectedOrder && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.7)", zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered shadow-lg">
            <div className="modal-content border-0">
              <div className="modal-header bg-light">
                <h5 className="modal-title fw-bold">Order #{selectedOrder._id?.slice(-5)}</h5>
                <button className="btn-close" onClick={() => setSelectedOrder(null)} />
              </div>
              <div className="modal-body p-4">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="text-muted small text-uppercase fw-bold">Shipping Info</label>
                    <p className="small mb-0 text-muted">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                    <p className="fw-bold mb-0">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                    <p className="small mb-0 text-muted">{selectedOrder.email} | {selectedOrder.phone}</p>
                    <p className="small text-muted">{selectedOrder.address}</p>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <label className="text-muted small text-uppercase fw-bold">Update Status</label>
                    <div>
                      <select
                        className="form-select w-auto d-inline-block shadow-sm"
                        value={selectedOrder.status}
                        onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Returned">Returned</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-sm align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Item</th>
                        <th>Size</th>
                        <th className="text-center">Qty</th>
                        <th className="text-end">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.orderItems?.map((item, i) => (
                        <tr key={i}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <img src={item.image} alt="" className="rounded border" style={{ width: "35px", height: "35px", objectFit: "cover" }} />
                              <span className="fw-bold small">{item.productName}</span>
                            </div>
                          </td>
                          <td><span className="badge bg-light text-dark border">{item.size}</span></td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-end">৳{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-end mt-3 h5 fw-bold text-success">
                  Total: ৳{selectedOrder.total}
                </div>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-secondary px-4 shadow-sm" onClick={() => setSelectedOrder(null)}>Close</button>
                <button className="btn btn-primary px-4 shadow-sm" onClick={handlePrint}>Print Invoice</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;