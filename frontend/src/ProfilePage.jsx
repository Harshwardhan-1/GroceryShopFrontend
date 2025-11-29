  import {useState,useEffect} from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import './ProfilePage.css';

  export default function ProfilePage(){
    const navigate=useNavigate();
  const [data,setData]=useState([]);
  const [image,setImage]=useState("");

  useEffect(()=>{
    const fetchUser = async ()=>{
      const response = await axios.get("http://localhost:5000/api/all/particularUser",{withCredentials:true});
      setData(response.data.data);
    };
    fetchUser();
  },[]);


  const handlemulter=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("images",image);
    const response=await axios.post("http://localhost:5000/api/all/profilePic",formData,{withCredentials:true,headers:{"Content-Type":"multipart/form-data",},});
    setData(response.data.data);
  }

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
        navigate("/ProductPage/OrderPage/Product/AddToCart");
    }
  return(
    <>
      <div className="header">
        <button type='button' className='homes' onClick={ha}>Home</button>
        <button type= "button" className='homes' onClick={handleProduct}>Products</button>
        <button type="button" className='homes' onClick={handleFavorites}>Favorites</button>
        <button type='button' className='homes' onClick={handleCart}>Cart</button>
        <button type="button" className='homes'>Profile</button>
      </div>

      <div className="profile-container">
        <h1 className="profile-title">Profile Page</h1>





        <form className="profile-form" encType="multipart/form-data" onSubmit={handlemulter}>
        <label className="upload-btn">
        Upload Profile Pic
        <input type="file" name="images" onChange={(e)=>setImage(e.target.files[0])}/>
        </label>
        <button type="submit" className="submit-btn">Upload</button>
        </form>


        {data && (
          <div className="profile-box">
            <div className="profile-image-wrapper">
              <img src={data.profilePic ? `http://localhost:5000/uploads/${data.profilePic}` 
              :"https://cdn-icons-png.flaticon.com/512/847/847969.png"
                } 
                className="profile-image" 
                alt="profile"
              />
            </div>


            <div className="profile-info">
              <p><b>Name:</b> {data.name}</p>
              <p><b>Email:</b> {data.gmail}</p>
              <p><b>Address:</b> {data.address}</p>
              <p><b>Pincode:</b> {data.pincode}</p>
            </div>
          </div>
        )}
      </div>
      <h1>Recent Orders</h1>
    </>
  );
  }
