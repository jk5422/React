
function Signup() {

    return (
        <section id="signup-section">
            <div className="signupForm">
                <div className="title">
                    <h2>SignUp</h2>
                </div>
                <div className="form-section">
                    <form id="signupForm">
                        <div className="signup-details">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="signupEmail">Email:</label>
                            <input type="email" id="signupEmail" name="email" required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="phone">Phone:</label>
                            <input type="text" id="phone" name="phone" required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="dob">DOB:</label>
                            <input type="date" id="dob" name="dob" required />
                        </div>
                        <div className="signup-details">
                            <fieldset>
                                <legend>Gender</legend>
                                <input type="radio" name="gender" value="male" required /> Male
                                <input type="radio" name="gender" value="female" required /> Female
                                <input type="radio" name="gender" value="other" required /> Other
                            </fieldset>
                        </div>
                        <div className="signup-details">
                            <label htmlFor="city">City:</label>
                            <input type="text" id="city" name="city" required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="hobbies">Hobbies:</label>
                            <input type="text" id="hobbies" name="hobbies" required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="spassword" name="password" required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="confirmpassword">Confirm Password:</label>
                            <input type="password" id="sconfirmpassword" required />
                        </div>
                        <button type="submit">Register</button>
                        <button type="button" id="signupBack" onClick={() => history.back()}>Back</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Signup
