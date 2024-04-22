import { Link } from "react-router-dom"

function PageNotFound() {
    return (
        <div>
            <h1>404</h1>
            <h2>Page Not Found..!</h2>
            <Link to={'/'}>Return to Home</Link>
        </div>
    )
}

export default PageNotFound
