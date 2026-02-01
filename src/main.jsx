import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Context
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import { MediaProvider } from "./context/MediaContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <OrderProvider>
        <ProductProvider>
          {/* Add MediaProvider here */}
          <MediaProvider> 
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MediaProvider>
        </ProductProvider>
      </OrderProvider>
    </CartProvider>
  </StrictMode>
);
