
import reviewSchema from "../../models/reviewProductModel.js";


const reviewController = []

reviewController.getReviews = async(req, response) => {
    const reviews = await reviewSchema.find();
    response.json(reviews);
}

reviewController.saveReview = async(req, response) => {
    const {rating, comment, idEmployee, idProucts} = req.body
    const newReview = new reviewSchema({rating, comment, idEmployee, idProucts})
    await newReview.save()
    response.json({message: "review Guardado Exitosament"})
}

reviewController.updateReview = async(req, response) => {
     const {rating, comment, idEmployee, idProucts} = req.body
    await reviewSchema.findByIdAndUpdate(req.params.id, {
       rating, comment, idEmployee, idProucts
      }, {new: true})
      response.json({message: "review updated"})
}


reviewController.deletReview = async (req, response) => {
  await reviewSchema.findByIdAndDelete(req.params.id)
  response.json({message: "review deleted"})
}


export default reviewController;