// import { Link } from "react-router-dom"

import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        {/* <a href="/">Home</a>*/}
                        {/*<Link to={'/'}>Home</Link>*/}
                        <NavLink to={'/'}
                            style={({ isActive }) => { return { backgroundColor: isActive ? "green" : "blue" } }}
                        >Home</NavLink>

                    </li>
                    <li>
                        {/*<a href="/about">About</a>*/}
                        {/*<Link to={'/about'}>About</Link>*/}
                        <NavLink to={'/about'}>About</NavLink>

                    </li>
                    <li>
                        {/* <a href="/service">Service</a>*/}
                        {/*<Link to={'/service'}>Service</Link>*/}
                        <NavLink to={'/service'}>Service</NavLink>
                    </li>
                    <li>
                        {/*<Link to={'/user'}>UserList</Link>*/}
                        <NavLink to={'/user'}>UserList</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/geturl'}>GetURLParams</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
