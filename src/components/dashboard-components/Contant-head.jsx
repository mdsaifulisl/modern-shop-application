import { IoMdNotifications } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

function ContantHead({ handleSidebar }) {
  return (
    <>
      <div className="dashboard-main-head py-4 d-flex justify-content-between align-items-center">
        <div className="view">
          <h6 className="d-link-color">Total Revenue</h6>
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2 gap-md-3">
            <h5 className="green mb-0">$ 1,000.00</h5>

            <p
              className="d-link-color mb-0 ms-md-auto"
              style={{ fontSize: "0.8rem" }}
            >
              Total view <span className="green">3000.00</span>
            </p>
          </div>
        </div>

        <div className="notifeations d-flex align-items-center gap-3">
          <p
            className="position-relative fs-4 pointer"
            style={{ cursor: "pointer" }}
          >
            <FaMessage />{" "}
            <span
              className="position-absolute bg-danger rounded-circle"
              style={{
                borderRadius: "50%",
                width: "10px",
                height: "10px",
                top: "20%",
                right: "5%",
              }}
            ></span>
          </p>
          <p className="position-relative fs-3">
            <IoMdNotifications />{" "}
            <span
              className="position-absolute bg-danger rounded-circle"
              style={{
                borderRadius: "50%",
                width: "10px",
                height: "10px",
                top: "25%",
                right: "20%",
              }}
            ></span>
          </p>
          <p
            className="fs-4 cursor-pointer d-block d-lg-none"
            style={{ cursor: "pointer" }}
            onClick={handleSidebar}
          >
            <FaBars />
          </p>
        </div>
      </div>
    </>
  );
}

export default ContantHead;
