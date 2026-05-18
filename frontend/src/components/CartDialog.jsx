import React from 'react'

const cartDialog = ({outOfStockItems,showDialog,setShowDialog,handleOrder,cart}) => {
  return (
    <div>  {showDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 uppercase">
              Some items are out of stock
            </h2>
            <div className="flex flex-col gap-2 mb-6">
              {outOfStockItems.map((item) => (
                <p key={item.productId} className="text-gray-600">
                  — {item.name}
                </p>
              ))}
            </div>
<p className="text-gray-500 mb-6">
  {outOfStockItems.length === cart.length
    ? "All items in your cart are out of stock. Please remove them and try again."
    : "Do you want to continue without these items? They will remain in your cart."
  }
</p>
<div className="flex gap-4">
  {outOfStockItems.length < cart.length && ( 
    <button
      className="flex-1 bg-black text-white py-3 uppercase tracking-widest"
      onClick={() => { setShowDialog(false); handleOrder(true); }}
    >
      Continue without them
    </button>
  )}
  <button
    className="flex-1 border py-3 uppercase tracking-widest"
    onClick={() => setShowDialog(false)}
  >
    {outOfStockItems.length === cart.length ? "OK" : "Cancel"}
  </button>
</div>
          </div>
        </div>
      )}</div>
  )
}

export default cartDialog