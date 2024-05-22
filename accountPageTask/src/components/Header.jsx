import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { GlobalInfo } from "../App";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state ? location.state.email : '';
    const [loggedIn, setLoggedIn] = useState(false);
    const { users, setUsers } = useContext(GlobalInfo);
    useEffect(() => {
        const menuIcon = document.querySelector('.navbar .navdiv .menu-icon');
        const menu = document.querySelector('.navbar .tabs .menu');

        menuIcon.addEventListener('click', function () {
            menu.classList.toggle('open');
        });

    }, [])

    useEffect(() => {
        if (Array.isArray(users) && users.length > 0) {
            const resIndex = users.findIndex(user => user.email === email);
            console.log(resIndex)
            if (resIndex !== -1) {
                const getUser = { ...users[resIndex] };
                setLoggedIn(getUser.isLogin);
            } else {
                setLoggedIn(false);
                navigate('/');
            }
        }
        else {
            navigate('/');
        }
    }, [users])


    const handleLogout = () => {
        // const usersList = JSON.parse(localStorage.getItem('users')) || [];
        if (Array.isArray(users) && users.length > 0) {
            const resIndex = users.findIndex(user => user.email === email);
            if (resIndex !== -1) {
                const updatedUser = { ...users[resIndex], isLogin: false };
                users[resIndex] = updatedUser;
                setUsers(users);
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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="#">About</Link></li>
                    <li><Link to="#">Contact</Link></li>
                    {
                        loggedIn ? <li> <button onClick={handleLogout}>LogOut</button> </li>
                            : <li><Link to={'/login'}>Login</Link>  <Link to={'signup'}>SignUp</Link> </li>

                    }

                </ul>
            </div>
        </nav>
    )
}

export default Header
