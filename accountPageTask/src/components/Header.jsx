import { Link } from "react-router-dom"

function Header() {
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
                    <li><Link href="#">Home</Link></li>
                    <li><Link href="#">About</Link></li>
                    <li><Link href="#">Contact</Link></li>
                    <button>Login</button>
                    <button>SignUp</button>
                </ul>
            </div>
        </nav>
    )
}

export default Header
