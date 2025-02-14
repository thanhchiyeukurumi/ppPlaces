import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddPlace() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        type: "restaurant",
    });
    const [images, setImages] = useState([]); 
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found. Please log in.");

            
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("location", formData.location);
            formDataToSend.append("type", formData.type);

            images.forEach((image) => {
                formDataToSend.append("images", image); 
            });

            const res = await fetch("http://localhost:5000/places", { 
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
                body: formDataToSend, // No need to set content-type, fetch will do it for us
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to create place");

            setSuccess("Place added successfully!");
            setTimeout(() => navigate("/dashboard"), 200);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="add-place">
            <h2>Add New Place</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>

                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </label>

                <label>
                    Location:
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </label>

                <label>
                    Images (Max: 4):
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} required />
                </label>

                <label>
                    Type:
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="restaurant">Restaurant</option>
                        <option value="cafe">Cafe</option>
                        <option value="hotel">Hotel</option>
                        <option value="park">Park</option>
                        <option value="museum">Museum</option>
                        <option value="shopping_mall">Shopping Mall</option>
                        <option value="beach">Beach</option>
                        <option value="mountain">Mountain</option>
                        <option value="historical_site">Historical Site</option>
                        <option value="amusement_park">Amusement Park</option>
                    </select>
                </label>

                <button type="submit">Add Place</button>
            </form>
        </div>
    );
}
