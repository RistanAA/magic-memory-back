const express = require('express');
const router = express.Router();
const Scores = require('../schemas/score')

router.post('/score', async (req, res) => {
    try {
        const { userId, username, score } = req.body
        const lastScore = await Scores.findOne({ userId })
        if (lastScore && lastScore.score < score) {
            await Scores.updateOne({ userId }, { score })
            return res.status(200).send({
                message: "update success"
            })
        }else if (lastScore && lastScore.score > score){
            return res.status(200).send({
                message: "Score is lower then the previos one"
            })
        }
        else if (!lastScore) {
            const newScore = await Scores.create({
                userId,
                username,
                score
            })
            return res.status(200).send({
                message: "success",
                newScore
            })
        }


    } catch (error) {
        return (
            res.status(400).send({
                message: error.message
            })
        )
    }
})

router.get('/score', async (req, res) => {
    try {
        const score = await Scores.find({}).sort({score:'desc'})
        return (
            res.status(200).send({
                message: "success",
                score
            })
        )
    } catch (error) {
        return (
            res.status(400).send({
                message: error.message
            })
        )
    }
})

module.exports = router;