import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {

    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState(location.state ? location.state.email : '');
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const usersList = JSON.parse(localStorage.getItem('users')) || [];

        if (Array.isArray(usersList) && usersList.length > 0) {
            const resIndex = usersList.findIndex(user => user.email === email && user.password === password);
            if (resIndex !== -1) {
                const updatedUser = { ...usersList[resIndex], isLogin: true };
                usersList[resIndex] = updatedUser;
                localStorage.setItem('users', JSON.stringify(usersList));
                navigate('/profile', { state: { email: email, isLogin: true } });
            } else {
                alert("Error..! User Not Found OR Password Incorrect");
            }
        }
        else {
            navigate('/signup', { state: { email: email } });
        }
    };

    return (

        <section id="login-section">
            <div className="loginForm">
                <div className="title">
                    <h2>Login</h2>
                </div>
                <div className="form-section">
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <div className="login-details">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="lemail" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="login-details">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="lpassword" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit">Login</button>
                        <button type="button" id="logback" onClick={() => history.back()}>Back</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login
