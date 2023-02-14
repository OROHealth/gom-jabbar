import { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import Eye from '../images/Eye.png';
import PageTransition from "./PageTransition";


const Signup=({Login,error, isAuthenticated})=>{
    const [ID,setID]=useState({email:"", password:""});
    const [formData,setFormData]=useState({email:'',pass:"",confirmPass:""})
    const [signup,setSignup]=useState(false);
    const [errorFlag,setErrorFlag]=useState({flag:false,message:''});
    const navigate=useNavigate();
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
    if(isAuthenticated==true){
        navigate('/home');
    }
    return(
        <PageTransition>
        <Container>
            {(signup==false)?<SignUpDiv>
                <Header> <StyledImage src={Eye}></StyledImage><h1>Cari-Eye</h1></Header>
                <SignUpForm onSubmit={handleLogIn}>
                <StyledLabel>Email</StyledLabel>
                <input value={ID.email} onChange={e=>setID({...ID,email:e.target.value})} type='email'></input>
                <StyledLabel>Password</StyledLabel>
                <input value={ID.password} onChange={e=>setID({...ID,password:e.target.value})} type='password'></input>
                {(errorFlag.flag==true)&&<ErrorBox> {errorFlag.message}</ErrorBox>}
                <StyledButton >Log In</StyledButton>
            </SignUpForm>
            <StyledButton onClick={toggleSignUp}>Register</StyledButton></SignUpDiv>
            :<SignUpDiv><SignUpForm onSubmit={handleSignUp}>
                <label>Email</label>
                <input value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} type='email'></input>
                <label>Password</label>
                <input value={formData.password} onChange={e=>setFormData({...formData,pass:e.target.value})} type='password'></input>
                <label>Confirm Password</label>
                <input value={formData.password} onChange={e=>setFormData({...formData,confirmPass:e.target.value})} type='password'></input>
                {(errorFlag.flag==true)&&<ErrorBox> {errorFlag.message}</ErrorBox>}
                <StyledButton>Sign up</StyledButton>
            </SignUpForm>
            <button onClick={toggleSignUp}>Back to Log In</button></SignUpDiv>}
        </Container>
        </PageTransition>
    )
}
export default Signup;
const Container=styled.div`
`
const SignUpForm=styled.form`
display: flex;
flex-direction: column;
padding-bottom: 10px
`
const SignUpDiv=styled.div`
display: flex;
flex-direction: column;
margin:80px;
margin-left: 250px;
margin-right: 250px;
padding-bottom:200px;
padding-top: 100px;
padding-left: 20px;
padding-right: 20px;
border:2px solid black;
min-width: 100px;
background-color: lightgrey;
`
const ErrorBox =styled.div`
border:red solid 1px;
display: flex;
flex-direction: row;
justify-content: center;
margin-top: 30px;
`
const StyledButton=styled.button`

font-family: "gill sans";
`
const StyledLabel=styled.label`
font-family:"gill sans";
font-size:17px;
`
const StyledImage=styled.img`
width:100px;
`
const Header=styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
