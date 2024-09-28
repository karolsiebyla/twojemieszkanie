import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("signUp");

    const handleLogout = () => {
        localStorage.removeItem("signUp");
        // localStorage.removeItem("name");
        // localStorage.removeItem("email");
        // localStorage.removeItem("password");
        navigate('/');
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <img src="/icon.svg" alt="..." width="25" className="me-3"/> Twoje mieszkanie</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page" to="/">Strona główna</Link>
                </li>

                <li className="nav-item">
                <Link className="nav-link text-dark" to="/menu/flats">Mieszkania</Link>
                </li>
                
                <li className="nav-item">
                <Link className="nav-link text-dark" to="/contact">Kontakt</Link>
                </li>
               
            </ul>
            <ul className="navbar-nav">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <span className="navbar-text text-m">Witaj, {localStorage.getItem("name")}!</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger btn-logout ms-2" onClick={handleLogout}>Wyloguj</button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/menu/profile">Zaloguj się</Link>
                            </li>
                        )}
                    </ul>
            <ul className="navbar-nav">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Menu
                </a>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/menu/flats">Mieszkania</Link></li>
                    <li><Link className="dropdown-item" to="/menu/profile">Profil</Link></li>
                    {/* <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/logout">Wyloguj się<br/>/Usuń konto</Link></li> */}
                </ul>
                </li>
            </ul>
            
            </div>
        </div>
        
        </nav>
    )
}

export function Footer() {
return (
    <div className="text-center p-4 border-top">
        <img src="/icon.svg" alt="..." width="25" className="me-2" />
        Twoje mieszkanie
    </div>
)
}