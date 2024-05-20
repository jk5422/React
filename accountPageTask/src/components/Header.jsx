import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state ? location.state.email : '';
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        const menuIcon = document.querySelector('.navbar .navdiv .menu-icon');
        const menu = document.querySelector('.navbar .tabs .menu');

        menuIcon.addEventListener('click', function () {
            menu.classList.toggle('open');
        });

        const usersList = JSON.parse(localStorage.getItem('users')) || [];
        if (Array.isArray(usersList) && usersList.length > 0) {
            const resIndex = usersList.findIndex(user => user.email === email);
            if (resIndex !== -1) {
                const getUser = { ...usersList[resIndex] };
                setLoggedIn(getUser.isLogin);
            } else {
                setLoggedIn(false);
                navigate('/');
            }
        }
        else {
            navigate('/');
        }
    }, [])


    const handleLogout = () => {
        const usersList = JSON.parse(localStorage.getItem('users')) || [];
        if (Array.isArray(usersList) && usersList.length > 0) {
            const resIndex = usersList.findIndex(user => user.email === email);
            if (resIndex !== -1) {
                const updatedUser = { ...usersList[resIndex], isLogin: false };
                usersList[resIndex] = updatedUser;
                localStorage.setItem('users', JSON.stringify(usersList));
                setLoggedIn(false);
                navigate('/');
            } else {
                setLoggedIn(false);
                navigate('/');
            }
        }
    }

    return (
        <nav className="navbar">
            <div className="navdiv">
                <div className="logo"><Link href="#">Lucent</Link></div>
                <div className="menu-icon">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
            <div className="tabs">
                <ul className="menu">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="#">About</Link></li>
                    <li><Link href="#">Contact</Link></li>
                    {
                        loggedIn ? <button onClick={handleLogout}>LogOut</button>
                            : <><Link to={'/login'}>Login</Link>  <Link to={'signup'}>SignUp</Link></>

                    }
                </ul>
            </div>
        </nav>
    )
}

export default Header
