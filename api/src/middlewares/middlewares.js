const validate = (req, res, next) => {
  const { name, description, platforms, image, released, rating, genreIds } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  if (!description) return res.status(400).json({ error: "Missing description" });
  if (!platforms) return res.status(400).json({ error: "Missing platforms" });
  if (!image) return res.status(400).json({ error: "Missing image" });
  if (!released) return res.status(400).json({ error: "Missing release date" });
  if (!rating) return res.status(400).json({ error: "Missing rating" });
  if (!genreIds) return res.status(400).json({ error: "Missing genres" });

  next();
};

module.exports = {
  validate,
}