import {useLocation} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './ProductsPage.css';
import axios from 'axios';
export default function HomeProduct(){
    const navigate=useNavigate();
    const [data,setData]=useState([]);
    const location=useLocation();
    const yadav=location.state?.charu;

    useEffect(()=>{
        const fetch=async()=>{
            const response=await axios.get("https://grocery-store-backend-1.onrender.com/api/product/allimages",{withCredentials:true});
            setData(response.data.data);
            console.log(response);
        };
        fetch();
},[]);

     const handle=async(id)=>{
        const send={id};
        const response=await axios.post("https://grocery-store-backend-1.onrender.com/api/product/particular",send,{withCredentials:true});
        navigate("/ProductPage/OrderPage",{state:{charu:response.data.data}});
     }

     const ha=()=>{
        navigate("/ProductsPage")
     }
     const handleCart=()=>{
        navigate("/ProductPage/OrderPage/Product/AddToCart");
     }

     const handleFavorites=()=>{
      navigate("/AddToCart/Favorites")
     }

     const handleProfile=()=>{
      navigate("/ProfilePage");
     }

    return(
        <>
        <div className="header">
            <button type='button' onClick={ha} className='home'>Home</button>
            <button type="button" className='home'>Products</button>
            <button type='button' className='home' onClick={handleFavorites}>Favorites</button>
            <button  type="button" onClick={handleCart} className='home'>Cart</button>
            <button type='button' className='home' onClick={handleProfile}>Profile</button>
        </div>

  <div className="products-wrapper">
    {
      data && data.map((st, index) => (
        <div className="product-card" key={index}>
          <p className="product-name">{st.name}</p>
          <p className="product-price">{st.price}</p>
          <img src={`https://grocery-store-backend-1.onrender.com/uploads/${st.image}`} alt={st.name} className="product-image" />
          <button className="btn-add" onClick={() => handle(st._id)}>Add</button>
        </div>
      ))
    }
  </div>

        {
            yadav && yadav.map((st,index)=>(
                <p key={index}>{st.name}</p>
            ))
        }
        </>
    );
}