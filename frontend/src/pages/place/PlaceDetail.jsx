import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPlaceDetail } from "../../api";

export default function PlaceDetail() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      async function loadPlace() {
          try {
              const data = await fetchPlaceDetail(id);
              setPlace(data);
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      }
      loadPlace();
  }, [id]);

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="place-detail">
            <Link to="/places" className="back-button">⬅ Quay lại</Link>
            
            <h1>{place.name}</h1>
            <p><strong>Địa điểm:</strong> {place.location}</p>
            <p><strong>Mô tả:</strong> {place.description}</p>

            <div className="place-images">
                {place.images.map((img, index) => (
                    <img key={index} src={img} alt={place.name} className="place-image" />
                ))}
            </div>

            <h2>Đánh giá</h2>
            {place.reviews && place.reviews.length > 0 ? (
                <ul>
                    {place.reviews.map(review => (
                        <li key={review._id}>
                            <strong>{review.author.username}</strong>: {review.body} ({review.rating}⭐)
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Chưa có đánh giá nào.</p>
            )}
        </div>
    );
}
