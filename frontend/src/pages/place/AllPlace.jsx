import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchPlaces } from "../../api";

export default function AllPlace() {
    const [places, setPlaces] = React.useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const locationFilter = searchParams.get("location");

    React.useEffect(() => {
        async function loadPlaces() {
            try {
                const data = await fetchPlaces();
                setPlaces(data);
            } catch (err) {
                console.error(err);
            }
        }
        loadPlaces();
    }, [searchParams]);  

    const displayPlaces = locationFilter
        ? places.filter(place => place.location.toLowerCase().includes(locationFilter.toLowerCase())) // 🔍 Tìm kiếm theo ký tự
        : places;

    const placeElements = displayPlaces.map(place => (
        <div key={place._id} className="place-name"> 
            <Link
                to={`/places/${place._id}`}
                state={{
                    search: `?${searchParams.toString()}`,
                    location: locationFilter
                }}
            >
                <img src={place.images[0]} alt={place.name} />
                <div className="place-info">
                    <h3>{place.name}</h3>
                    <p>{place.location}</p>
                    <p>{place.description}</p>
                </div>
            </Link>
        </div>
    ));

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            if (value === null) {
                newParams.delete(key);
            } else {
                newParams.set(key, value);
            }
            return newParams;
        });
    }

    return (
        <div className="allplace-container">
            <div className="place-list-filter-container">
                {locationFilter ? (
                    <button
                        onClick={() => handleFilterChange("location", null)} // 🛠 Fix key
                        className="clear-filters"
                    >
                        Clear filter
                    </button>
                ) : null}
            </div>
            <div className="place-list">
                {placeElements.length > 0 ? placeElements : <p>Không có địa điểm phù hợp.</p>}
            </div>
        </div>
    );
}
