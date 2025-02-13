import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    images: [String],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
}, { timestamps: true });

const Place = mongoose.model('Place', placeSchema);
export default Place; 