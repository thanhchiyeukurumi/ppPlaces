import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import isReviewOwner from "../middleware/isReviewOwner.js";
import Review from "../models/Review.js";
import Place from "../models/Place.js";

const router = express.Router({ mergeParams: true });

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { content, rating } = req.body;
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ error: "Location does not exist." });
        }

        const review = new Review({
            content,
            rating,
            author: req.user.id,
            place: req.params.id
        });

        await review.save();
        place.reviews.push(review);
        await place.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

router.delete("/:reviewId", authMiddleware, isReviewOwner, async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.reviewId);
        res.json({ message: "Review has been deleted." });
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

export default router;
