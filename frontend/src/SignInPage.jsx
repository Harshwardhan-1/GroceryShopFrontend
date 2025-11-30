import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import './SignInPage.css';
export default function SignInPage(){
    const navigate=useNavigate();
    const [gmail,setGmail]=useState("");
    const [password,setPassword]=useState("");
    const location=useLocation();
    const ram=location.state?.harsh;


    const handle=async(e)=>{
        e.preventDefault();
        const send={gmail,password};
        const response=await axios.post( "https://grocery-store-backend-3.onrender.com/api/all/signin",send,{withCredentials:true});
        if(response.data.message=== "login successfull"){
            navigate("/ProductsPage",{state:{harsh:ram}});
        }
    }
    return(
        <>
        <h1>Sign In</h1>

        <form onSubmit={handle}>
            <input type="text" placeholder='Enter your gmail here' onChange={(e)=>setGmail(e.target.value)}/>
            <input type="password" placeholder='Enter your password here' onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" />
        </form>
       
        </>
    );
}