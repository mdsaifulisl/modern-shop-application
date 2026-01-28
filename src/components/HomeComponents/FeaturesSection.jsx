import React from "react";
import {
  FaHeadset,
  FaShieldAlt,
  FaShippingFast,
  FaThumbsUp,
} from "react-icons/fa";
// Importing specific icons from the Lucide set
import {
  LuDollarSign,
  LuTruck,
  LuHeadphones,
  LuShieldCheck,
} from "react-icons/lu";

const FeaturesSection = () => {
  // const features = [
  //   {
  //     icon: <LuDollarSign size={32} />,
  //     title: "Money Back Guarantee",
  //     text: "Shall open Divide a one",
  //   },
  //   {
  //     icon: <LuTruck size={32} />,
  //     title: "Home Delivery",
  //     text: "On orders over $100",
  //   },
  //   {
  //     icon: <LuHeadphones size={32} />,
  //     title: "Always Support",
  //     text: "24/7 support available",
  //   },
  //   {
  //     icon: <LuShieldCheck size={32} />,
  //     title: "Secure Payment",
  //     text: "100% secure payment",
  //   },
  // ];

  return (
    <section
      className="py-5 hero-height"
      style={{ backgroundColor: "#fdfdfd" }}
    >
      <div className="row text-center g-2 g-lg-4">
        <h2 className="fw-bold mb-5">Why Shop With Us?</h2>

        <div className="col-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm p-4 hover-up">
            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 mx-auto">
              <FaShippingFast className="text-white fs-3" />
            </div>
            <h5 className="fw-bold">Fast Delivery</h5>
            <p className="small text-muted mb-0">
              Reliable shipping across the country right to your doorstep.
            </p>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm p-4 hover-up">
            <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 mx-auto">
              <FaShieldAlt className="text-success fs-3" />
            </div>
            <h5 className="fw-bold">Secure Payments</h5>
            <p className="small text-muted mb-0">
              Your transactions are safe and encrypted with our SSL protocols.
            </p>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm p-4 hover-up">
            <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 mx-auto">
              <FaHeadset className="text-warning fs-3" />
            </div>
            <h5 className="fw-bold">24/7 Support</h5>
            <p className="small text-muted mb-0">
              Our dedicated team is always ready to assist you anytime.
            </p>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm p-4 hover-up">
            <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 mx-auto">
              <FaThumbsUp className="text-danger fs-3" />
            </div>
            <h5 className="fw-bold">High Quality</h5>
            <p className="small text-muted mb-0">
              We ensure every product undergoes a strict quality check.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
