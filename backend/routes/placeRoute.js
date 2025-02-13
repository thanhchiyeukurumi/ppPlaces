import express from 'express';
import Place from '../models/Place.js';
import authMiddleware from '../middleware/authMiddleware.js';
import isPlaceOwner from '../middleware/isPlaceOwner.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const places = await Place.find();
    res.json(places);
});

router.get("/:id", async (req, res) => {
    try {
        const place = await Place.findById(req.params.id)
            .populate("owner", "username email")
            .populate("reviews", "content rating author")
        if (!place) return res.status(404).json({ error: "Error fetching location list." });

        res.json(place);
    } catch (error) {
        res.status(500).json({ error: "Error fetching location list." });
    }
});


router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name, description, address, images, location } = req.body;
        const newPlace = new Place({
            name,
            description,
            address,
            images,
            owner: req.user.id, 
            location,
        });

        await newPlace.save();
        res.status(201).json(newPlace);
    } catch (error) {
        res.status(500).json({ error: "Error creating location." });
    }
});


router.put("/:id", authMiddleware, isPlaceOwner, async (req, res) => {
    const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPlace);
});

// TODO:  add delete all reviews of this place after deleted the place
router.delete("/:id", authMiddleware, isPlaceOwner, async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    res.json({ message: "Place deleted" });
});


export default router;
