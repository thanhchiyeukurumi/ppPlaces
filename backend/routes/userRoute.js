import express from 'express';
import { loginUser, regUser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import Place from '../models/Place.js';
import Review from '../models/Review.js';

const router = express.Router();

router.post('/register', regUser);
router.post('/login', loginUser);
router.get("/places", authMiddleware, async (req, res) => {
    try {
        const places = await Place.find({ owner: req.user.id }); // Why can't use req.userId here T-T
        res.json(places);
        // console.log(req.userId); // This is undefined ????
    } catch (error) {
        res.status(500).json({ message: "Error fetching places" });
    }
});

router.get("/reviews", authMiddleware, async (req, res) => {
    try {
        const reviews = await Review.find({ author: req.user.id }); // Why can't use req.userId here T-T
        res.json(reviews);
        // console.log(req.userId); // This is undefined ????
    } catch (error) {
        res.status(500).json({ message: "Error fetching places" });
    }
});

export default router;