import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Inbox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Md. Saiful Islam",
      email: "saiful@gmail.com",
      subject: "Order Issue",
      message: "I have a problem with my recent order. Please check.",
      seen: false,
      date: "2026-01-30",
    },
    {
      id: 2,
      name: "Rahim Uddin",
      email: "rahim@gmail.com",
      subject: "Product Inquiry",
      message: "Is this product available in large size?",
      seen: true,
      date: "2026-01-28",
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);

  const openDetails = (msg) => {
    // mark as seen when opened
    if (!msg.seen) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msg.id ? { ...m, seen: true } : m
        )
      );
    }
    setSelectedMessage(msg);
  };

  return (
    <div className="container-fluid py-4">
      <h4 className="fw-bold mb-4">Inbox</h4>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id}>
                  <td>
                    <div className="fw-semibold">{msg.name}</div>
                    <small className="text-muted">{msg.email}</small>
                  </td>

                  <td>
                    <span className={msg.seen ? "" : "fw-bold"}>
                      {msg.subject}
                    </span>
                  </td>

                  <td>{msg.date}</td>

                  <td>
                    {msg.seen ? (
                      <span className="badge bg-success">Seen</span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        Unseen
                      </span>
                    )}
                  </td>

                  <td className="text-end">
                    <button
                      className={`btn btn-sm ${
                        msg.seen
                          ? "btn-outline-success"
                          : "btn-outline-primary"
                      }`}
                      data-bs-toggle="modal"
                      data-bs-target="#messageModal"
                      onClick={() => openDetails(msg)}
                    >
                      {msg.seen ? "Seen" : "Unseen"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------- Message Details Modal -------- */}
      <div
        className="modal fade"
        id="messageModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title">Message Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {selectedMessage && (
              <div className="modal-body">
                <p>
                  <strong>Name:</strong> {selectedMessage.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedMessage.email}
                </p>
                <p>
                  <strong>Subject:</strong> {selectedMessage.subject}
                </p>
                <p>
                  <strong>Message:</strong>
                </p>
                <div className="bg-light p-3 rounded">
                  {selectedMessage.message}
                </div>
              </div>
            )}

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
