import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    images: [String],
    type: {
        type: String,
        enum: ["restaurant", "cafe", "hotel", "park", "museum", "shopping_mall", "beach", "mountain", "historical_site", "amusement_park"],
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
}, { timestamps: true });

const Place = mongoose.model('Place', placeSchema);
export default Place; 