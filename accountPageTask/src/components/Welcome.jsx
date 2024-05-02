
function Welcome() {
    return (

        <section id="welcome-section">
            <div className="welcomeForm">
                <div className="title">
                    <h2>Welcome</h2>
                </div>
                <div className="form-section">
                    <form id="emailForm">
                        <div className="welcome-email">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" required />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Welcome
