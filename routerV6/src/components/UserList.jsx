import { Link } from "react-router-dom"

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

function UserList() {
    return (
        <div>
            <h2>UserData</h2>
            <ul>
                {
                    userData.users.map((user) => (
                        <li key={user.id}>
                            <Link to={`/user/${user.id}`}>{user.name}</Link>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default UserList
