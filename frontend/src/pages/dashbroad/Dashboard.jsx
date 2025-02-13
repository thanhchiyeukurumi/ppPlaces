import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchPlacesByUser } from "../../api";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [places, setPlaces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const data = await fetchPlacesByUser();
                setPlaces(data);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };

        fetchData();
    }, [, navigate]); // lmao

    return (
        <div>
            <h1>Dashboard</h1>

            {places.length > 0 ? (
                <ul>
                    {places.map((place) => (
                        <li key={place._id}>{place.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No places found.</p>
            )}
        </div>
    );
};

export default Dashboard;
