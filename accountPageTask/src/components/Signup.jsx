import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state ? location.state.email : '';
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: email,
        phone: '',
        dob: '',
        gender: '',
        city: '',
        hobbies: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const { confirmPassword, ...newUser } = formData; // discarding the confirmPassword value at that time of save users data
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            dob: '',
            gender: '',
            city: '',
            hobbies: '',
            password: '',
            confirmPassword: ''
        });

        navigate('/login', { state: { email: formData.email } });
    };



    return (
        <section id="signup-section">
            <div className="signupForm">
                <div className="title">
                    <h2>SignUp</h2>
                </div>
                <div className="form-section">
                    <form id="signupForm" onSubmit={handleSubmit}>
                        <div className="signup-details">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="signupEmail">Email:</label>
                            <input type="email" id="signupEmail" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="phone">Phone:</label>
                            <input type="text" id="phone" name="phone" maxLength={10} value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="dob">DOB:</label>
                            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
                        </div>
                        <div className="signup-details">
                            <fieldset>
                                <legend>Gender</legend>
                                <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} required /> Male
                                <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} required /> Female
                            </fieldset>
                        </div>
                        <div className="signup-details">
                            <label htmlFor="city">City:</label>
                            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="hobbies">Hobbies:</label>
                            <input type="text" id="hobbies" name="hobbies" value={formData.hobbies} onChange={handleChange} required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="spassword" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="signup-details">
                            <label htmlFor="confirmpassword">Confirm Password:</label>
                            <input type="password" id="sconfirmpassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
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
