import React from "react";
import TrendChart from "./TrendChart";
const DeshbordHome = () => {
  const ordersData = [
    {
      id: "#ORD-1021",
      customer: "John Doe",
      status: "Shipped",
      amount: "$120",
      date: "12 Sep 2024",
    },
    {
      id: "#ORD-1022",
      customer: "Sarah Smith",
      status: "Pending",
      amount: "$89",
      date: "12 Sep 2024",
    },
    {
      id: "#ORD-1023",
      customer: "Alex Brown",
      status: "Cancelled",
      amount: "$45",
      date: "11 Sep 2024",
    },
    {
      id: "#ORD-1024",
      customer: "Alex Brown",
      status: "Cancelled",
      amount: "$45",
      date: "11 Sep 2024",
    },
  ];
  return (
    <>
      {/* Shipped Cards */}
      <div className="shipped pt-4">
        <div className="row g-3">
          {[
            { title: "Shipped orders", count: "12", className: "shipped-card" },
            {
              title: "Pending orders",
              count: "08",
              className: "shipped-card2",
            },
            {
              title: "cancelled orders",
              count: "06",
              className: "shipped-card3",
            },
          ].map((item, idx) => (
            <div className="col-lg-4" key={idx}>
              <div className={item.className}>
                <h6 className="text-white px-4 pt-3">{item.title}</h6>
                <span
                  className="text-white fw-bold fs-1"
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "25px",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {item.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Row: Inbox + Orders */}
      <div className="orders-chart mt-5">
        <div className="row">
          {/* Inbox */}
          <div className="col-lg-6">
            <div className="inbox-section mt-4">
              <div className="dashboard-card p-4">
                <h6 className="mb-3">Inbox</h6>
                {[
                  {
                    title: "New Order Received",
                    time: "2 minutes ago",
                    dot: "green_bg",
                  },
                  {
                    title: "Payment Pending",
                    time: "1 hour ago",
                    dot: "yellow_bg",
                  },
                  { title: "Order Cancelled", time: "Yesterday", dot: "red" },
                  {
                    title: "New Customer Signup",
                    time: "Today",
                    dot: "green_bg",
                  },
                ].map((item, idx) => (
                  <div
                    className="inbox-item d-flex align-items-start gap-3 mb-3"
                    key={idx}
                  >
                    <span className={`dot ${item.dot}`}></span>
                    <div>
                      <p className="mb-1 fw-semibold">{item.title}</p>
                      <small className="d-link-color">{item.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="col-lg-6">
            <div className="orders-section mt-4">
              <div className="dashboard-card p-4">
                <h6 className="mb-3">Recent Orders</h6>
                <div className="table-responsive">
                  <table className="table table-borderless align-middle mb-0">
                    <thead>
                      <tr className="d-link-color">
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersData.map((order, idx) => (
                        <tr key={idx}>
                          <td>{order.id}</td>
                          <td>{order.customer}</td>
                          <td>
                            <span
                              className={`badge ${
                                order.status === "Cancelled"
                                  ? "bg-danger"
                                  : order.status === "Pending"
                                    ? "bg-warning text-dark"
                                    : "bg-success"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="green">{order.amount}</td>
                          <td>{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="dashbord_ordersChart mt-5">
            <TrendChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeshbordHome;
