const express = require('express')
const control = express()
const db = require('../db')

class wearhouseController {

    async createWearhouse(req, res) {

        try {
            const { name, address } = req.body

            const newWearhouse = await db.query(`insert into wearhouse(name, address) values ($1, $2) returning wearhouse_id as id`, [name, address])
            res.json(newWearhouse.rows[0])
        }

        catch (e) {
            res.sendStatus(400)
        }
    }

    async getWearhouse(req, res) {
        try {
            const id = req.params.id

            const wearhouse = await db.query(`select * from wearhouse where wearhouse_id = $1`, [id])

            res.json(wearhouse.rows[0])
        }

        catch (e) {
            res.sendStatus(404)
        }
    }


    async getAllWearhouse(req, res) {
        try {
            const wearhouse = await db.query(`select * from wearhouse`)

            if (wearhouse.rows[0].length === 0) throw new Error

            res.json(wearhouse.rows[0])
        }

        catch (e) {
            res.sendStatus(404)
        }
    }


    async deleteWearhouse(req, res) {

        try {
            const id = req.params.id

            const deleteW = await db.query(`delete from wearhouse where wearhouse_id = $1`, [id])

            res.sendStatus(200)
        }

        catch (e) {
            res.sendStatus(404)
        }

    }
}

module.exports = new wearhouseController()