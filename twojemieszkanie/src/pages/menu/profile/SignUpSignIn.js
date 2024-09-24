import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import SupportFileForm from './SupportFileForm';
import './SignUpSignIn.css';
import { useNavigate } from 'react-router-dom';


function SignUpSignIn() {
    const name=useRef()
    const email=useRef()
    const password=useRef()
    const [showSupportFileForm, setShowSupportFileForm]=useState(false)
    const [show, setShow]=useState(false)
    const localSignUp=localStorage.getItem("signUp")
    const localEmail=localStorage.getItem("email")
    const localPassword=localStorage.getItem("password")
    const localName=localStorage.getItem("name")
    const Navigate = useNavigate()

    useEffect(()=> {
        if(localSignUp){
            setShowSupportFileForm(true)
        }   
        if(localEmail){
            setShow(true)
        }
    })
   

    const handleClick=()=>{
    
        if(name.current.value&&email.current.value&&password.current.value)
        {
            localStorage.setItem("name",name.current.value)
            localStorage.setItem("email",email.current.value)
            localStorage.setItem("password",password.current.value)
            localStorage.setItem("signUp",email.current.value)
            alert("Konto utworzyłeś z sukcesem!")
            // window.location.reload()
            Navigate('/');
        }
    }

    const handleSignIn=()=>{
        if(email.current.value==localEmail&&password.current.value===localPassword){
            localStorage.setItem("signUp",email.current.value)
            // window.location.reload()
            Navigate("/");
        } else{
            alert("Niepoprawny e-mail lub hasło")
        }
    }

    

    return (
        <div>
            {showSupportFileForm ? <SupportFileForm/> :
            (show ?
                <div className='containerLogin'>
                    <h2>Hello {localName}</h2>
                    <div className='input_space'>
                        <input placeholder='Email' type='text' ref={email} />
                    </div>
                    <div className='input_space'>
                        <input placeholder='Password' type='password' ref={password} />
                    </div>
                    <button onClick={handleSignIn}>Zaloguj się</button>
                </div>
                :
                <div className='containerLogin'>
                    <div className='input_space'>
                        <input placeholder='Name' type='text' ref={name} />
                    </div>
                    <div className='input_space'>
                        <input placeholder='Email' type='text' ref={email} />
                    </div>
                    <div className='input_space'>
                        <input placeholder='Password' type='password' ref={password} />
                    </div>
                    <button onClick={handleClick}>Zarejestruj się</button>
                </div>)
            }
        </div>
    
    );
}

export default SignUpSignIn
