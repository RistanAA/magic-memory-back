const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const Cards = require('../schemas/card')

router.post("/admin/card", authMiddleware, async (req, res) => {
    try {
        const { src } = req.body
        const card = await Cards.findOne({ src })
        if (!card) {
            const newCard = await Cards.create({
                src, matched: false
            })

            res.send({
                message: "success",
                card: newCard
            })
        } else {
            res.status(400).send({
                errorMessage: "Card cannot duplicate"
            })
        }
    } catch (error) {
        return (
            res.status(400).send({
                errorMessage: error.message
            })
        )
    }

})

router.get("/cards", async (req, res) => {
    try {
        const cards = await Cards.find({})
        res.status(200).send({
            message: "success",
            cards
        })
    } catch (error) {
        return (
            res.status(400).send({
                errorMessage: error.message
            })
        )
    }
})

module.exports = router;