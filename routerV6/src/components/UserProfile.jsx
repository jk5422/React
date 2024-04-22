import { useParams } from "react-router-dom"

const userData = {
    users: [
        {
            id: 1,
            name: 'user 1'
        },
        {
            id: 2,
            name: 'user 2'
        },
        {
            id: 3,
            name: 'user 3'
        },
    ]
}

function UserProfile() {
    const { userId } = useParams();
    const user = userData.users.find((user) => user.id === parseInt(userId));
    console.log(user);
    return (
        <div>
            <h1>User Profile</h1>
            {user ? (
                <div>
                    <h3>Name :- {user.name}</h3>
                    <h4>Id :- {user.id}</h4>
                </div>
            ) : (<h1>User Not Found..!</h1>)}
        </div>
    )
}

export default UserProfile
