import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './AddToCart.css';
import axios from 'axios';

export default function AddToCart(){
    const navigate=useNavigate();
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            const response=await axios.get("https://grocery-store-backend-2.onrender.com/api/cart/cartItems",{withCredentials:true});
            setData(response.data.allCart);
        };
        fetch();
    },[]);

    const handleDelete=async(id)=>{
        const send={id};
        const response=await axios.post("https://grocery-store-backend-2.onrender.com/api/cart/cartDelete",send,{withCredentials:true});
        console.log(response.data);
        alert("Conform you want to Delete");
         
        const fetch=async()=>{
            const response=await axios.get("https://grocery-store-backend-2.onrender.com/api/cart/cartItems",{withCredentials:true});
            setData(response.data.allCart);
        };
        fetch();
    };

    const ha=()=>{
    navigate("/ProductsPage");
    }

    const handleProduct=()=>{
      navigate("/ProductPage/OrderPage/Product");
    }
   
    const handleFavorites=()=>{
        navigate("/AddToCart/Favorites");
    }
    const handleCart=()=>{
        navigate("/ProfilePage");
    }

    
    
    
    
    return(
        <>
          <div className="header">
            <button type='button' className='home' onClick={ha}>Home</button>
            <button type="button" className='home' onClick={handleProduct}>Products</button>
            <button  type='button' className='home' onClick={handleFavorites}>Favorites</button>
            <button type="button" className='home'>Cart</button>
            <button type='button'  className='home' onClick={handleCart}>Profile</button>
        </div>
            
           <div className="cart-page">
            <h1 className="cart-title">Your Cart</h1>
            <div className="cart-wrapper">
                {
                    data && data.map((st,index)=>(
                        <div className="cart-card" key={index}>
          <img src={`https://grocery-store-backend-2.onrender.com/uploads/${st.image}`} alt={st.name} className="cart-image"/>
           <div className="cart-info">
           <h2 className="cart-name">{st.name}</h2>
           <p className="cart-qty">Quantity: <span>{st.quantity}</span></p>
           <p className="cart-price">Price: <span>₹{st.price}</span></p>
           
           <button onClick={()=>handleDelete(st._id)} className='cart-btns'>Remove from Cart</button>
        </div>
       </div>
        ))
      }
            </div>
        </div>
        </>
    );
}
