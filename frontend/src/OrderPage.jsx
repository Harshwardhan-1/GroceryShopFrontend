import {useLocation} from 'react-router-dom';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './OrdersPage.css';
export default function OrderPage(){
    const navigate=useNavigate();
    const [change,setChange]=useState([]);
    const [quantity,setQuantity]=useState("");
    const location=useLocation();
    
    const harsh=location.state?.charu;
    
    const ChooseQuantity=async(id)=>{
        if(!quantity)return;
        const send={id,quantity};
        const response=await axios.post("https://grocery-store-backend-3.onrender.com/api/product/getquantity",send,{withCredentials:true});
        setChange(response.data.data);

    }
    
    const ha=()=>{
        navigate("/ProductsPage");
    }
    const handleHome=()=>{
        navigate("/ProductPage/OrderPage/Product");
    }

   

    const handleAddToCart=async()=>{
     const addtocart={userId:harsh.userId,quantity:quantity,price:change,image:harsh.image};
     const response=await axios.post("https://grocery-store-backend-3.onrender.com/api/cart/cartItems",addtocart,{withCredentials:true});
     console.log(response.data);
     navigate("/ProductPage/OrderPage/Product/AddToCart",{state:{yadav:harsh}});
    }
    
    const handleCart=()=>{
        navigate("/ProductPage/OrderPage/Product/AddToCart");
    }





//handle payment button
const handlePayment = async () => {
  if (!quantity || !change) return alert("Please select quantity first");

  try {
    // Backend ko call karo order create karne ke liye
    const sendData = {
      amount: Number(change),           // total price from state
      productName: harsh.name
    };

    const { data } = await axios.post(
      "https://grocery-store-backend-3.onrender.com/api/cart/AddPayment",
      sendData,
      { withCredentials: true }
    );

    // Razorpay options
    const options = {
        key: "rzp_test_RlXg2HpJH77h64",  // test key
      amount: data.amount,              // paise me amount backend se
      currency: data.currency,
      name: "My Grocery Store",
      description: data.notes.product,
      order_id: data.id,
      handler: function (response) {
        // payment success hone par
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: harsh.name,
        email: harsh.gmail || "",   // agar email available ho
        contact: harsh.phone || "" // agar phone available ho
      },
      theme: { color: "#3399cc" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.log(error);
    alert("Something went wrong with payment");
  }
};


//handle payment button end










    return(
        <>
          <div className="header">
            <button type='button' className='home' onClick={ha}>Home</button>
            <button type="button" className='home' onClick={handleHome}>Products</button>
            <button className='home'>Favorites</button>
            <button type="button" onClick={handleCart} className='home'>Cart</button>
            <button className='home'>Profile</button>
        </div>
        <div className="order-container">
  <h1 className="page-title">Order Page</h1>
  <h1 className="product-name">{harsh.name}</h1>
  <img src={`https://grocery-store-backend-3.onrender.com/uploads/${harsh.image}`} alt="" />
  <form onSubmit={(e) => e.preventDefault()}>
    <input type="number" placeholder='Enter quantity' min="1" onChange={(e)=>setQuantity(e.target.value)} />
    <button onClick={() => ChooseQuantity(harsh._id)}>Press Enter</button>
  </form>


  {change > 0 && (
    <div className="total">
      <h2>Total Cost: <span className="cost">{change}</span></h2>
      <h2>Total Quantity: <span className="qty">{quantity}</span></h2>
      <button className='coste' onClick={handleAddToCart}>Add To Cart</button>
      <button type='button' onClick={handlePayment} className='qty'>Proceed to payment</button>
    </div>
  )}
</div>
        </>
    );
}