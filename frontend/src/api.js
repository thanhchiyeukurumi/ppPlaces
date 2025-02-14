const API_URL = 'http://localhost:5000/places';

export async function fetchPlaces() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching location list.", error);
        return null;
    }
}

export async function fetchPlaceDetail(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Location not found.");
        return await res.json();
    } catch (error) {
        console.error("Error fetching location list.", error);
        throw error;
    }
}

export async function fetchPlacesByUser() {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        const res = await fetch(`http://localhost:5000/auth/places`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch places.");
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching places:", error.message);
        throw error;
    }
}

export async function fetchReviewsByUser() {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        const res = await fetch(`http://localhost:5000/auth/reviews`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch reviews.");
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching reviews:", error.message);
        throw error;
    }
}




export async function addPlace(place) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(place)
    });
    return res.json();
}

// did'nt test yet :bbbbb
export async function updatePlace(id, place) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(place)
    });
    return res.json();
}

export async function deletePlace(id) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in.");

    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete place.");
    }

    return await res.json();
}

export async function deleteReview(id, idPlace) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in.");

    const res = await fetch(`${API_URL}/${idPlace}/reviews/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete review.");
    }

    return await res.json();
}
