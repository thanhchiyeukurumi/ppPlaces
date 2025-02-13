import Place from "../models/Place.js";

const isPlaceOwner = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({ error: "Location does not exist." });
    }

    if (place.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "You do not have permission to perform this action." });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Ownership verification error." });
  }
};

export default isPlaceOwner;
