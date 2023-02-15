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

    //toggle signup form vs login form
    const toggleSignUp=()=>{
        if(signup==false){
            setSignup(true);
        }
        else{
            setSignup(false);
        }
        setErrorFlag({flag:false,message:''});
    }

    // function that checks with the login credential is correct and logs user in
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

    //function that handles registering new account
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
                <StyledInput value={ID.email} onChange={e=>setID({...ID,email:e.target.value})} type='email'></StyledInput>
                <StyledLabel>Password</StyledLabel>
                <StyledInput value={ID.password} onChange={e=>setID({...ID,password:e.target.value})} type='password'></StyledInput>
                {(errorFlag.flag==true)&&<ErrorBox> {errorFlag.message}</ErrorBox>}
                <ButtonDiv><StyledButton >Log In</StyledButton></ButtonDiv>
            </SignUpForm>
            <ButtonDiv><StyledButton onClick={toggleSignUp}>Register</StyledButton></ButtonDiv></SignUpDiv>
            :<SignUpDiv>
                <Header> <StyledImage src={Eye}></StyledImage><h1>Cari-Eye</h1></Header>
                <SignUpForm onSubmit={handleSignUp}>
                <label>Email</label>
                <StyledInput value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} type='email'></StyledInput>
                <label>Password</label>
                <StyledInput value={formData.password} onChange={e=>setFormData({...formData,pass:e.target.value})} type='password'></StyledInput>
                <label>Confirm Password</label>
                <StyledInput value={formData.password} onChange={e=>setFormData({...formData,confirmPass:e.target.value})} type='password'></StyledInput>
                {(errorFlag.flag==true)&&<ErrorBox> {errorFlag.message}</ErrorBox>}
                <ButtonDiv><StyledButton>Sign up</StyledButton></ButtonDiv>
            </SignUpForm>
            <ButtonDiv><StyledButton onClick={toggleSignUp}>Back to Log In</StyledButton></ButtonDiv></SignUpDiv>}
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
justify-content:center;
align-items: center;

`
const SignUpDiv=styled.div`
display: flex;
flex-direction: column;
margin:40px;
margin-left: 250px;
margin-right: 250px;
padding-bottom:100px;
padding-top: 100px;
padding-left: 20px;
padding-right: 20px;
border:2px solid black;
min-width: 380px;
background-color: lightgrey;
`
const ErrorBox =styled.div`
font-size:20px;
display: flex;
flex-direction: row;
justify-content: center;
margin-top: 30px;
color:red;
`
const StyledButton=styled.button`
font-size: 20px;
padding:10px;
border-radius: 50px;
border: none;
&:active{
    background-color: grey;
}
width:200px;
margin-top: 10px;
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
const ButtonDiv=styled.div`
display:flex;
flex-direction: row;
justify-content: center;
align-items: center;
`
const StyledInput=styled.input`
width:400px;
`

