import rateLimit from "express-rate-limit";

export const limit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: {
        status: 428,
        error: "Too many request"
    }
})



