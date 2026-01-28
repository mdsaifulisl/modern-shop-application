
const ProductCard = ({ filteredProducts, handleDetails}) => {
   
    return (
        <>
           {filteredProducts.map((product) => (
                <div className="col-6 col-md-4 col-xl-3" key={product.id}>
                  <div className="card h-100">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.productName}
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{product.productName}</h6>

                      <div className="mb-2">
                        <span className="discount-price">
                          ৳ {product.discount_price}
                        </span>{" "} 
                        {product.price !== product.discount_price && (
                          <span className="original-price">
                            ৳ {product.price}
                          </span>
                        )}
                      </div>
                      <button
                        className="btn btn-primary mt-auto"
                        onClick={() => handleDetails(product.id)}
                      >
                        Buy Now{" "}
                      </button>
                    </div>
                  </div>
                </div>
              ))} 
        </>
    );
};

export default ProductCard;