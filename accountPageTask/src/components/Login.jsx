
function Login() {
    return (

        <section id="login-section">
            <div className="loginForm">
                <div className="title">
                    <h2>Login</h2>
                </div>
                <div className="form-section">
                    <form id="loginForm">
                        <div className="login-details">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="lemail" name="email" required />
                        </div>
                        <div className="login-details">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="lpassword" name="password" required />
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
