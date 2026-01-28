
// import icons
import { FaPowerOff } from "react-icons/fa6";
import {
  MdOutlineShoppingCart,
  MdOutlineLocalShipping,
  MdDashboard,
  MdBorderRight,
} from "react-icons/md";
// import { IoMdSettings } from "react-icons/io";
// import { CiCreditCard1 } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { BiSlider } from "react-icons/bi";

function Sidebar({ handleSidebar, contant, setContant }) {
    
    return (
        <>
            <div className="dashboard-sidebar position-relative">
                  <div className="d-block d-lg-none position-absolute top-0 end-0 fs-3">
                    <TiDelete onClick={handleSidebar} />
                  </div>

                  <div className="dashboard-sidebar-header-icon mb-3">
                    <FaPowerOff />
                    <span>Logout</span>
                  </div>

                  <div className="dashboard-sidebar-body d-flex float-start flex-column gap-3">

                    <div className={`dashboard-sidebar-body-group p-2 rounded-2 d-flex align-items-center gap-2 float-start ${contant === 1 ? "active" : ""}`} onClick={() => {setContant(1), handleSidebar()}}>
                      <span>
                        <MdDashboard />
                      </span>
                      <p>Dashboard</p>
                    </div>

                    <div className={`dashboard-sidebar-body-group p-2 rounded-2 d-flex align-items-center gap-2 float-start ${contant === 2 ? "active" : ""}`} onClick={() =>{setContant(2), handleSidebar()}  }>
                      <span>
                        <MdOutlineShoppingCart />
                      </span>
                      <p>Order</p>
                    </div>

                    <div className={`dashboard-sidebar-body-group p-2 rounded-2 d-flex align-items-center gap-2 float-start ${contant === 3 ? "active" : ""}`} onClick={() => {setContant(3), handleSidebar()} }>
                      <span>
                        <FaShoppingBag />
                      </span>
                      <p>Products</p>
                    </div>

                    <div className={`dashboard-sidebar-body-group p-2 rounded-2 d-flex align-items-center gap-2 float-start ${contant === 4 ? "active" : ""}`} onClick={() => {setContant(4), handleSidebar()}}>
                      <span>
                        <BiSlider />
                      </span>
                      <p>Slider</p>
                    </div>
                    {/* <div className="dashboard-sidebar-body-group p-2 rounded-2 d-flex align-items-center gap-2 float-start">
                      <span>
                        <CiCreditCard1 />
                      </span>
                      <p>Payments</p>
                    </div>
                    <div className="dashboard-sidebar-body-group p-2 rounded-2 d-flex align-items-center gap-2 float-start">
                      <span>
                        <IoMdSettings />
                      </span>
                      <p>Settings</p>
                    </div> */}
                  </div>
                </div>
        </>
    );
}

export default Sidebar;