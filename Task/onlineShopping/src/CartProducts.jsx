function CartProducts(props) {
  return (
    <div className="w-full h-screen bg-gray-100 overflow-y-auto">
      <div className="flex justify-between bg-green-200 p-5 ">
        <div className="font-bold text-xl">BuyBliss</div>
        <div className="font-bold text-xl flex">
          <div ><button onClick={() => { props.clickOnCart(); }} >Cart</button></div>
          <div >{`(${props.cartTotal})`}</div>
        </div>
      </div>
      <div className="w-full h-5/6 bg-gray-100 flex flex-col items-center justify-center p-4 ">
        <div className='w-full md:2/3 lg:w-1/3 h-5/6 bg-white overflow-y-auto rounded-lg shadow-lg p-4'>
          <div className='flex justify-end space-y-4'><button className="bg-blue-800 text-white p-2 hover:bg-blue-600" onClick={() => { props.clickOnClose(); }} >x</button></div>
          <div>{props.isCartEmpty ? <div className="text-center font-bold text-xl mx-auto"> No products Found</div> :
            <div className="flex flex-col justify-between mb-8">{
              props.cart.map((cartProduct, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className='p-4'><img src={cartProduct.image} alt="image " className='w-20 h-20 '></img></div>
                  <div className='w-2/3 flex justify-between items-center p-4'>
                    <div className='w-2/3 text-sm font-bold text'>{cartProduct.title}</div>
                    <div className=' text-sm font-bold text'>{cartProduct.price}</div>
                  </div>
                  <div ><button className="bg-red-800 p-2 text-white hover:bg-red-600" onClick={() => { props.removeCart(props.cart, index); }} >remove</button></div>
                </div>
              ))
            }
              <div className="w-full flex justify-between text-lg font-bold ">
                <div></div>
                <div className='flex justify-between p-4'>
                  <div>TotalAmount</div>
                  <div>{props.totalAmount}</div>
                </div>
                <div></div>
              </div>
            </div>

          }</div>
        </div>
      </div>
    </div>
  );
}
export default CartProducts