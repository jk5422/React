import { useSearchParams } from "react-router-dom"

function GetURLParams() {
    const [serchParams, setSearchParams] = useSearchParams();

    const name = serchParams.get('name');
    const city = serchParams.get('city');

    const person = {
        name: "JK",
        city: "Amreli",
    }

    return (
        <div>
            <h3>Name is : {name}</h3>
            <h3>City is : {city}</h3>

            <button onClick={() => setSearchParams({ ...person, country: "India" })}>Update URL Params Value</button>
        </div>
    )
}

export default GetURLParams
