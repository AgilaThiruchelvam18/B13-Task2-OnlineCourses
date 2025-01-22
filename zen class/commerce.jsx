import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  let fetchProducts = async () => {
    const productsData = await fetch(
      "https://6461c1c2491f9402f4aa0565.mockapi.io/products"
    );
    const productResponse = await productsData.json();
    setProducts(productResponse);
  };

  let addToCart = (product) => {
    setCart([...cart, product]);
    setTotal(total + parseInt(product.price));
  };

  let removeCart = (item,index) => {
    cart.splice(index,1)
    setCart([...cart])
    setTotal(total - parseInt(item.price))
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div className="w-4/5 p-6 overflow-y-auto">
          <div className="grid grid-cols-6 gap-6">
            {products.map((product, index) => {
              return (
                <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                  <img
                    className="object-cover w-full h-48 rounded-md"
                    src={`https://picsum.photos/seed/${product.avatar}/200/300`}
                    alt=""
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">Rs.{product.price}</p>
                    <button
                      onClick={() => {
                        addToCart(product);
                      }}
                      className="w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                    <span>
                      {/* {Array.from({
                        length: Math.floor(Math.random() * (5 - 1) + 1),
                      }).map((_, i) => {
                        return (
                          <StarSolid
                            key={i}
                            className="inline-block text-yellow-500 size-6"
                          />
                        );
                      })} */}

                      {/* <StarOutline className="inline-block text-white-500 size-6" />
                  <StarOutline className="inline-block text-white-500 size-6" />
                  <StarOutline className="inline-block text-white-500 size-6" />
                  <StarOutline className="inline-block text-white-500 size-6" /> */}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-1/5 p-6 bg-white shadow-lg">
          <h2 className="mb-4 text-xl font-bold">Shopping Cart</h2>
          <div className="space-y-4">
            {cart.map((item, index) => {
              return (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">Rs.{item.price}</p>
                  </div>
                  <button onClick={() => {
                    removeCart(item,index)
                  }} className="text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          <div className="pt-4 mt-8 border-t">
            <div className="flex items-center justify-between">
              <span className="font-bold">Total:</span>
              <span className="font-bold">Rs.{total}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;