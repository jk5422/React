import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <div>
            Home Component

            <button onClick={() => navigate('/about')}>Go to About us</button>
        </div>
    );
}

export default Home;
