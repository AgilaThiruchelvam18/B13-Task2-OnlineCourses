import { useState } from 'react'
import { useEffect } from 'react'
import Card from './Card'
import CartProducts from './CartProducts'
function App() {
  const [products,setProducts]=useState([]);
  const [cart,setCart]=useState([]);
  const [cartTotal,setCartTotal]=useState(0);
  const [totalAmount,setTotalAmount]=useState(0);
const [isModalOpen,setModalOpen]=useState(true);
const [isCartEmpty,setIsCartEmpty]=useState(true);
const [message,setMessage]=useState("");
  let fetchProducts=async ()=>{
    let productList=await fetch("https://fakestoreapi.com/products");
  let products=await productList.json();
  setProducts(products);
}
let addToCart=(product)=>{
 let productInCart=cart.some((item)=>item.id===product.id);
 console.log("productInCart====>",productInCart);
  if(productInCart){
    setMessage("Item Already Added To Cart!");
    console.log("Message====>",message);
  }
  else{
    setMessage("");
  setCart([...cart,product]);
  setCartTotal(cartTotal+1);
  console.log("PPPPtotalAmount=====>",totalAmount);
  console.log("product.price=====>",product.price);
  setTotalAmount((totalAmount + product.price).toFixed(2)); 
}
}
let removeCart=(cart,index)=>{
  console.log("cart=====>",cart);
  // setTotalAmount(totalAmount-cart[index].price);
  setTotalAmount((totalAmount - cart[index].price).toFixed(2)); 
  cart.splice(index,1);
  setCart([...cart]);
  setCartTotal(cartTotal-1);
  console.log("RRRtotalAmount=====>",totalAmount);
  console.log("cart price=====>",cart[index].price);

}
let clickOnCart=()=>{
  setModalOpen(false);
}
let clickOnClose=()=>{
  setModalOpen(true);
 
}
useEffect(() => {fetchProducts()
},[]);
useEffect(() => {
  setIsCartEmpty(cart.length === 0);
}, [cart]);
console.log(products);
console.log(cart);
  return (
   <div>{
    isModalOpen?
    <Card message={message} isModalOpen={isModalOpen} products={products}  totalAmount={totalAmount} clickOnCart={clickOnCart} cartTotal={cartTotal} addToCart={addToCart}></Card>:
    <CartProducts isCartEmpty={isCartEmpty} isModalOpen={isModalOpen} totalAmount={totalAmount} cart={cart} clickOnClose={clickOnClose} cartTotal={cartTotal} removeCart={removeCart}></CartProducts>
  } </div>  
        
    )
}

export default App
