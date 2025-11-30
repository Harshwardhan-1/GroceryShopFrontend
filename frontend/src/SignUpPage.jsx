import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './SignUpPage.css';
export default function HomePage(){
    const navigate=useNavigate();
    const [data,setData]=useState([]);
    const [name,setName]=useState("");
    const [gmail,setGmail]=useState("");
    const [password,setPassword]=useState("");
    const [address,setAddress]=useState("");
    const [phoneno,setPhoneNo]=useState("");
    const [pincode,setPinCode]=useState("");



    useEffect(()=>{
        const fetch=async()=>{
            const response=await axios.get("https://grocery-store-backend-3.onrender.com/api/all/getAll");
            setData(response.data.allUsers);
        };
        fetch();
    },[]);

    const handle=async(e)=>{
        e.preventDefault();
        const send={name,gmail,password,address,phoneno,pincode};
        const response=await axios.post("https://grocery-store-backend-3.onrender.com/api/all/signup",send,{withCredentials:true});
        console.log(response.data);
        navigate("/SignInPage",{state:{harsh:data}});
    }

    const signIn=()=>{
        navigate("/SignInPage",{state:{harsh:data}});
    }

    return(
        <>
        <h1>Enter your details</h1>
        <form onSubmit={handle}>
    <input type="text" placeholder="Enter your name here" name="name" onChange={(e)=>setName(e.target.value)}/>
    <input type="email"placeholder="Enter your gmail here" name="gmail" onChange={(e)=>setGmail(e.target.value)}/>
    <input type="password"placeholder="Enter password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
    <input type="text" placeholder="Enter Your address" name="address" onChange={(e)=>setAddress(e.target.value)}/>
    <input type="text" placeholder="Enter your PhoneNo." name="phoneNo" onChange={(e)=>setPhoneNo(e.target.value)}/>
   <input type="text" placeholder="Enter your pin code" name="pinCode" onChange={(e)=>setPinCode(e.target.value)}/>
     <input type="submit" />
     <button type='button' className='signIn' onClick={signIn}>Already have an account go to <b className='harsh'>Sign in</b></button>
        </form>


      
        </>
    );
}