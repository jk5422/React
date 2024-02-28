// import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom";

function Github() {
    const data = useLoaderData();
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetch('https://api.github.com/users/jk5422').then(res => res.json()).then(data => {
    //         setData(data);
    //     })
    // }, [])

    return (
        <div className='flex flex-row items-center justify-around'>
            <div className="h-[100px] w-[100px]">
                <img src={data.avatar_url} alt="Github Picture" />
            </div>

            <div> Github Followers : {data.followers}</div>

        </div>
    )
}

export default Github;


{/* function is for load the data before come to this page this concept is connnect with loader functionality of react router dom*/ }
export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/jk5422');
    return response.json();
}
