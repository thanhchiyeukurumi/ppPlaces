import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchPlacesByUser, fetchReviewsByUser, deletePlace, deleteReview } from "../../api";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [places, setPlaces] = useState([]);
    const [reviews, setReviews] = useState([]);
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
                const dataReview = await fetchReviewsByUser();
                setReviews(dataReview);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };

        fetchData();
    }, [, navigate]); // lmao

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this place?")) return;
    
        try {
            await deletePlace(id);
            setPlaces(places.filter((place) => place._id !== id)); 
        } catch (error) {
            console.error("Error deleting place:", error);
            alert(error.message);
        }
    };
    const handleDeleteReview = async (id, idPlace) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
    
        try {
            await deleteReview(id, idPlace);
            setReviews(reviews.filter((review) => review._id !== id)); 
        } catch (error) {
            console.error("Error deleting review:", error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/dashboard/add-place">
            <button>Add New Place</button>
        </Link>
            <h2>Places:</h2>
            {places.length > 0 ? (
                <ul>
                    {places.map((place) => (
                        <li>
                            <Link to={`/places/${place._id}`} key={place._id}>{place.name}</Link>
                            <button onClick={() => handleDelete(place._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No places found.</p>
            )}
            <h2>Review:</h2>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <li>
                            <Link key={review._id} to={`/places/${review.place}`}>{review.content}</Link>
                            <button onClick={() => handleDeleteReview(review._id, review.place)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews found.</p>
            )}
        </div>
    );
};

export default Dashboard;
