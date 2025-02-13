import Review from "../models/Review.js";

const isReviewOwner = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ error: "Review does not exist." });
        }

        if (review.author.toString() !== req.user.id) {
            return res.status(403).json({ error: "You do not have permission to edit/delete this review." });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Server erroe." });
    }
};

export default isReviewOwner;
