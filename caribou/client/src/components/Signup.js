import { useState } from "react";
import styled from 'styled-components';


const Signup=({Login,error})=>{
    const [ID,setID]=useState({email:"", password:""});
    const [formData,setFormData]=useState({email:'',pass:"",confirmPass:""})
    const [signup,setSignup]=useState(false);
    const [errorFlag,setErrorFlag]=useState({flag:false,message:''});

    const toggleSignUp=()=>{
        if(signup==false){
            setSignup(true);
        }
        else{
            setSignup(false);
        }
    }

    const handleLogIn=(e)=>{
        e.preventDefault();
        fetch(`/users/${ID.email}/${ID.password}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.message=="Success"){
                Login(ID);
                setErrorFlag({flag:false, message:''});
            }
            else{
                setErrorFlag({flag:true, message:data.message});
            }
        })
        .catch((error)=>{
            window.alert(error);
        })

    }
    const handleSignUp=(e)=>{
        e.preventDefault();
        fetch("/user",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data.message=="Success"){
                setErrorFlag({flag:false,message:''});
                toggleSignUp();
            }
            else{
                setErrorFlag({flag:true, message:data.message});
                console.log(errorFlag);
            }
        })
        .catch((error)=>{
            window.alert(error);
        })
    }
    return(
        <div>
            {(signup==false)?<SignUpDiv><SignUpForm onSubmit={handleLogIn}>
                <label>Email</label>
                <input value={ID.email} onChange={e=>setID({...ID,email:e.target.value})} type='email'></input>
                <label>Password</label>
                <input value={ID.password} onChange={e=>setID({...ID,password:e.target.value})} type='password'></input>
                {(errorFlag.flag==true)&&<ErrorBox> {errorFlag.message}</ErrorBox>}
                <StyledButton >Log In</StyledButton>
            </SignUpForm>
            <button onClick={toggleSignUp}>Sign Up</button></SignUpDiv>
            :<SignUpDiv><SignUpForm onSubmit={handleSignUp}>
                <label>Email</label>
                <input value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} type='email'></input>
                <label>Password</label>
                <input value={formData.password} onChange={e=>setFormData({...formData,pass:e.target.value})} type='password'></input>
                <label>Confirm Password</label>
                <input value={formData.password} onChange={e=>setFormData({...formData,confirmPass:e.target.value})} type='password'></input>
                {(errorFlag.flag==true)&&<ErrorBox> {errorFlag.message}</ErrorBox>}
                <StyledButton>SignUp</StyledButton>
            </SignUpForm>
            <button onClick={toggleSignUp}>Log In</button></SignUpDiv>}
        </div>
    )
}
export default Signup;

const SignUpForm=styled.form`
display: flex;
flex-direction: column;
padding-bottom: 10px;
`
const SignUpDiv=styled.div`
display: flex;
flex-direction: column;
margin:80px;

`
const ErrorBox =styled.div`
border:red solid 1px;
display: flex;
flex-direction: row;
justify-content: center;
margin-top: 30px;
`
const StyledButton=styled.button`
margin-top:30px;
`