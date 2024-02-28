import { Outlet } from "react-router-dom"
import Footer from "../components/Footer/Footer.jsx"
import Header from "../components/Header/Header.jsx"

function Layouts() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layouts;
