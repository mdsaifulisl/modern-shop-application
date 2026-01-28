// React import Hooks
import { useState, useEffect } from "react";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// import css file
import "../../components/dashboard-components/deshbord.css";
// import components
import Sidebar from "../../components/dashboard-components/Sidebars";
import ContantHead from "../../components/dashboard-components/Contant-head";
import DeshbordHome from "../../components/dashboard-components/DeshbordHome";
import OrderList from "../../components/dashboard-components/OrderList";
import ProductList from "../../components/dashboard-components/ProductList";
import AddSlider from "../../components/dashboard-components/AddSlider";



function Dashbord() {
  // Hendel Sidebar
  const [sidebar, setSidebar] = useState(false);

  // Hendel Contant
  const [contant, setContant] = useState(1);

  const handleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSidebar((prev) => (prev ? false : prev));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="dashbord-bg">
        <div className="container py-5">
          <div className="dashboard shadow-lg rounded-3 pb-5">
            <div className="row g-2 position-relative">
              <div
                className={`col-md-2 m-0 dashboard-sidebar-mobile ${
                  sidebar ? "active" : ""
                }`}
              >
                <Sidebar
                  handleSidebar={handleSidebar}
                  contant={contant}
                  setContant={setContant}
                />
              </div>

              <div className="col-lg-10 col-12 m-0 p-0">
                {/* Changed h-100 to min-vh-100 to allow vertical growth */}
                <div className="dashboard-content dashboard-content-bg w-100 p-4 pt-0 min-vh-100">
                  <div className="dashboard-main d-flex flex-column h-100">
                    <ContantHead handleSidebar={handleSidebar} />

                    {/* Content Area Container */}
                    <div className="flex-grow-1 mt-3">
                      {contant === 1 && <DeshbordHome />}
                      {contant === 2 && <OrderList />}
                      {contant === 3 && <ProductList />}
                      {contant === 4 && <AddSlider />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashbord;
