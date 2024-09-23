import React from 'react';
import { useRef } from 'react';
import './SignUpSignIn.css';

function SignUpSignIn() {
    const name=useRef()
    const email=useRef()
    const password=useRef()

    const handleClick=()=>{
    
        if(name.current.value&&email.current.value&&password.current.value)
        {
            localStorage.setItem("Nazwa użytkownika",name.current.value)
            localStorage.setItem("Email",email.current.value)
            localStorage.setItem("Hasło",password.current.value)
            localStorage.setItem("Rejestracja",email.current.value)
            alert("Konto utworzyłeś z sukcesem!")
        }
    }
    return (
        <div>
            <div className='container'>
                <div className='input_space'>
                    <input placeholder='Nazwa użytkownika' type='text' ref={name} />
                </div>
                <div className='input_space'>
                    <input placeholder='Email' type='text' ref={email} />
                </div>
                <div className='input_space'>
                    <input placeholder='Hasło' type='password' ref={password} />
                </div>
                <button onClick={handleClick}>Zarejestruj się</button>
            </div>
        </div>
    )
}

export default SignUpSignIn
