import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { GlobalInfo } from "../App";

function Profile() {

    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state ? location.state.email : '';
    const { users } = useContext(GlobalInfo);

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: email,
        phone: '',
        dob: '',
        gender: '',
        city: '',
        hobbies: '',
    });

    useEffect(() => {

        if (Array.isArray(users) && users.length > 0) {
            const res = users.find(user => user.email === email);
            if (res) {
                setUserData(res);
            }
            else {
                navigate('/welcome');
            }
        }
        else {
            navigate('/welcome');
        }
    }, []);


    return (
        <section id="profile-section">
            <div className="title">
                <h2>User Profile</h2>
            </div>
            <div id="profile">
                <table border={1} cellPadding={5} cellSpacing={5}>
                    <thead>
                        <tr>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Dob</th>
                            <th>City</th>
                            <th>Hobbies</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{userData.firstName}</td>
                            <td>{userData.lastName}</td>
                            <td>{userData.phone}</td>
                            <td>{userData.email}</td>
                            <td>{userData.gender}</td>
                            <td>{userData.dob && format(new Date(userData.dob), 'dd-MM-yyyy')}</td>
                            <td>{userData.city}</td>
                            <td>{userData.hobbies}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="back">
                <button type="button" id="profileback" onClick={() => history.back()}>Back</button>
            </div>
        </section>

    )
}

export default Profile
