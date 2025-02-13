import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "No token, access denied." });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

    req.user = decoded; // Save user info to req.user
    req.userId = decoded.userId; // Save userId to req.userId
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

export default authMiddleware;
