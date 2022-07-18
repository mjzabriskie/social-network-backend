const router = require("express").Router();
const {
  getAllThought,
  getSingleThought,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").get(getAllThought).post(addThought);

// /api/thoughts/:id
router
  .route("/:id")
  .get(getSingleThought)
  .post(addThought)
  .put(updateThought)
  .delete(removeThought);

// /api/thoughts/:id/reactions
router.route("/:id/reactions").post(addReaction);

// /api/thoughts/:id/reactions/:reactionId
router.route("/:id/reactions/:reactionId").delete(removeReaction);

module.exports = router;
