import React, { useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product A",
      category: "Apparel",
      price: "$25",
      stock: 15,
      description: "High-quality cotton t-shirt with a modern fit.",
      sizes: ["S", "M", "L", "XL"],
      image:
        "https://th.bing.com/th/id/OIP.kDFGc5EYeX7z7sSxHp0hggAAAA?w=243&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
    },
    {
      id: 2,
      name: "Product B",
      category: "Accessories",
      price: "$70",
      stock: 5,
      description: "Durable leather belt with premium buckle.",
      sizes: ["One Size"],
      image:
        "https://th.bing.com/th/id/OIP.kDFGc5EYeX7z7sSxHp0hggAAAA?w=243&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Product State
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: 0,
    description: "",
    sizes: [],
    image: "https://via.placeholder.com/150",
  });

  const allAvailableSizes = ["S", "M", "L", "XL", "XXL", "One Size"];

  const handleSizeToggle = (size, mode) => {
    if (mode === "add") {
      const updatedSizes = newProduct.sizes.includes(size)
        ? newProduct.sizes.filter((s) => s !== size)
        : [...newProduct.sizes, size];
      setNewProduct({ ...newProduct, sizes: updatedSizes });
    } else {
      const updatedSizes = selectedProduct.sizes.includes(size)
        ? selectedProduct.sizes.filter((s) => s !== size)
        : [...selectedProduct.sizes, size];
      setSelectedProduct({ ...selectedProduct, sizes: updatedSizes });
    }
  };

  const handleImageChange = (e, mode) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (mode === "add")
          setNewProduct({ ...newProduct, image: reader.result });
        else setSelectedProduct({ ...selectedProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      price: `$${newProduct.price}`,
    };
    setProducts([...products, productToAdd]);
    setIsAddModalOpen(false);
    setNewProduct({
      name: "",
      category: "Apparel",
      price: "",
      stock: 0,
      description: "",
      sizes: [],
      image: "https://via.placeholder.com/150",
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setProducts(
      products.map((p) => (p.id === selectedProduct.id ? selectedProduct : p)),
    );
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0 text-dark">Products</h2>
        <button
          className="btn btn-primary shadow-sm"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add Product
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="shadow-sm border rounded overflow-hidden">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="row align-items-center p-3 m-0 border-bottom bg-white"
          >
            {/* 1. Image: Takes 3 units on mobile, 1 on desktop */}
            <div className="col-3 col-md-1">
              <img
                src={product.image}
                alt={product.name}
                className="rounded border object-fit-cover"
                width="60"
                height="60"
              />
            </div>

            {/* 2. Name & Description: Takes 9 units on mobile, 4 on desktop */}
            <div className="col-9 col-md-4">
              <div className="fw-bold text-dark">{product.name}</div>
              <div
                className="small text-muted text-truncate"
                style={{ maxWidth: "100%" }}
              >
                {product.description}
              </div>
            </div>

            {/* --- Mobile Only Row for Price and Stock --- */}
            <div className="col-12 d-md-none my-2 border-top pt-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small">Price: </span>
                  <span className="fw-bold text-primary">{product.price}</span>
                </div>
                <div>
                  <span
                    className={`badge ${product.stock < 10 ? "bg-danger" : "bg-success"}`}
                  >
                    {product.stock} units left
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Desktop Price: Hidden on mobile */}
            <div className="col-md-1 d-none d-md-block fw-bold text-center">
              {product.price}
            </div>

            {/* 4. Desktop Stock: Hidden on mobile */}
            <div className="col-md-2 d-none d-md-block text-center">
              <span
                className={`badge ${product.stock < 10 ? "bg-danger" : "bg-success"}`}
              >
                {product.stock} left
              </span>
            </div>

            {/* 5. Actions: Full width on mobile, 2 units on desktop */}
            <div className="col-12 col-md-4 col-lg-2 mt-2 mt-md-0 text-md-end d-flex gap-2 justify-content-end">
              <button
                className="btn btn-sm btn-outline-primary flex-grow-1 flex-md-grow-0"
                onClick={() => setSelectedProduct(product)}
              >
                <i className="bi bi-pencil me-1"></i> Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger bg-danger flex-grow-1 flex-md-grow-0"
                onClick={() =>
                  setProducts(products.filter((p) => p.id !== product.id))
                }
              >
                <i className="bi bi-trash me-1"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL LOGIC (Shared UI Structure) */}
      {(isAddModalOpen || selectedProduct) && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <form
              className="modal-content border-0 shadow"
              onSubmit={isAddModalOpen ? handleAddProduct : handleUpdate}
            >
              <div className="modal-header bg-dark text-white py-2">
                <h6 className="modal-title">
                  {isAddModalOpen
                    ? "Add New Product"
                    : `Edit ${selectedProduct.name}`}
                </h6>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setSelectedProduct(null);
                  }}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row">
                  <div className="col-md-4 text-center border-end">
                    <img
                      src={
                        isAddModalOpen
                          ? newProduct.image
                          : selectedProduct.image
                      }
                      className="rounded border mb-2 object-fit-cover"
                      width="150"
                      height="150"
                      alt="Preview"
                    />
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(e, isAddModalOpen ? "add" : "edit")
                      }
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="mb-3">
                      <label className="form-label fw-bold small">
                        Product Name
                      </label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        value={
                          isAddModalOpen
                            ? newProduct.name
                            : selectedProduct.name
                        }
                        onChange={(e) =>
                          isAddModalOpen
                            ? setNewProduct({
                                ...newProduct,
                                name: e.target.value,
                              })
                            : setSelectedProduct({
                                ...selectedProduct,
                                name: e.target.value,
                              })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold small">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={
                          isAddModalOpen
                            ? newProduct.description
                            : selectedProduct.description
                        }
                        onChange={(e) =>
                          isAddModalOpen
                            ? setNewProduct({
                                ...newProduct,
                                description: e.target.value,
                              })
                            : setSelectedProduct({
                                ...selectedProduct,
                                description: e.target.value,
                              })
                        }
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold small d-block">
                        Available Sizes
                      </label>
                      <div className="d-flex flex-wrap gap-2">
                        {allAvailableSizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            className={`btn btn-sm ${(isAddModalOpen ? newProduct.sizes.includes(size) : selectedProduct.sizes.includes(size)) ? "btn-primary" : "btn-outline-secondary"}`}
                            onClick={() =>
                              handleSizeToggle(
                                size,
                                isAddModalOpen ? "add" : "edit",
                              )
                            }
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label className="form-label fw-bold small">
                          Price
                        </label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          value={
                            isAddModalOpen
                              ? newProduct.price
                              : selectedProduct.price
                          }
                          onChange={(e) =>
                            isAddModalOpen
                              ? setNewProduct({
                                  ...newProduct,
                                  price: e.target.value,
                                })
                              : setSelectedProduct({
                                  ...selectedProduct,
                                  price: e.target.value,
                                })
                          }
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-bold small">
                          Stock
                        </label>
                        <input
                          required
                          type="number"
                          className="form-control"
                          value={
                            isAddModalOpen
                              ? newProduct.stock
                              : selectedProduct.stock
                          }
                          onChange={(e) =>
                            isAddModalOpen
                              ? setNewProduct({
                                  ...newProduct,
                                  stock: parseInt(e.target.value),
                                })
                              : setSelectedProduct({
                                  ...selectedProduct,
                                  stock: parseInt(e.target.value),
                                })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light py-2">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setSelectedProduct(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-primary px-4">
                  {isAddModalOpen ? "Save Product" : "Update Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
