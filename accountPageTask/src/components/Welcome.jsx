import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Welcome() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const usersList = JSON.parse(localStorage.getItem('users')) || [];

        if (Array.isArray(usersList) && usersList.length > 0) {
            const res = usersList.find(user => user.email === email);
            if (res) {
                navigate('/login', { state: { email: email } });
            }
            else {
                navigate('/signup', { state: { email: email } });
            }
        }
        else {
            navigate('/signup', { state: { email: email } });
        }


    };


    return (

        <section id="welcome-section">
            <div className="welcomeForm">
                <div className="title">
                    <h2>Welcome</h2>
                </div>
                <div className="form-section" onSubmit={handleSubmit}>
                    <form id="emailForm">
                        <div className="welcome-email">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Welcome
