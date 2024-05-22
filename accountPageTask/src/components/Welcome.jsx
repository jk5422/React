import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { GlobalInfo } from "../App";

function Welcome() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { users } = useContext(GlobalInfo);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (Array.isArray(users) && users.length > 0) {
            const res = users.find(user => user.email === email);
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
