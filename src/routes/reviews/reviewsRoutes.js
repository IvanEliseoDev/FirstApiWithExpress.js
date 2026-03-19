import express from "express";
import reviewController from "../../controllers/review/reviewProoductController.js";

const router = express.Router();

router.route("/")
    .get(reviewController.getReviews) 
    .post(reviewController.saveReview);

router.route("/:id")
    .get(reviewController.updateReview) 
    .post(reviewController.deletReview);

export default router;