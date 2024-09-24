import React from "react";
import './SignUpSignIn.css';

function SupportFileForm(){
    
    const logout=()=> {
        localStorage.removeItem("signUp")
        window.location.reload()
    }
    const deleteProfile=()=> {
        localStorage.clear()
        window.location.reload()
    }

    
    return (
        <div className='containerLogout'>
            <h2>Rejestracja/Logowanie</h2>
            <p>Witaj {localStorage.getItem('name')}</p>
            <button onClick={logout} className="logout">LogOut</button>
            <button onClick={deleteProfile} className="delete">Delete</button>
        </div>
    );
}
export default SupportFileForm;
