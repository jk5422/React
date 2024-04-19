import { useEffect } from "react";
import { getImageUrl } from "./utils";

export default function Profile() {

    useEffect(() => {

    }, [])

    return (
        <Card>
            <Avatar
                size={100}
                person={{
                    name: 'Katsuko Saruhashi',
                    imageId: 'YfeOqp2'
                }}
            />
        </Card>
    );
}

function Card({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}


function Avatar({ person, size }) {
    return (
        <img
            src={getImageUrl(person)}
            alt={person.name}
            width={size}
            height={size}
        />
    );
}

