const express = require('express')
const control = express()
const db = require('../db')

class orderController {

    async createOrder(req, res) {
        try {
            const { nameArr, likeAmountArr } = req.body
            let i = 0
            let totalPrice = 0
            let totalWeight = 0
            let totalVolume = 0
            let amountArr = []

            const promises = nameArr.map(async (name) => {

                const likeAmount = likeAmountArr[i]
                i++
                const reserve = await db.query(`select reserve from product where name = $1`, [name])

                const amount = await db.query(`select amount from product where name = $1`, [name])

                amountArr.push(amount.rows[0].amount)

                if (Number(reserve.rows[0].reserve) && Number(amount.rows[0].amount) === 0) res.json(404)

                else {

                    if (Number(amount.rows[0].amount) <= Number(likeAmount)) {
                        const reservation = await db.query(`update product set reserve = true where name = $1`, [name])

                        const info = await db.query(`select price, weight, volume from product where name = $1`, [name])

                        let totalPrice1 = Number(amount.rows[0].amount) * Number(info.rows[0].price)
                        let totalWeight1 = Number(amount.rows[0].amount) * Number(info.rows[0].weight)
                        let totalVolume1 = Number(amount.rows[0].amount) * Number(info.rows[0].volume)

                        totalPrice += totalPrice1
                        totalWeight += totalWeight1
                        totalVolume += totalVolume1
                    }
                    else {
                        const info = await db.query(`select price, weight, volume from product where name = $1`, [name])
                        let totalPrice1 = Number(likeAmount) * Number(info.rows[0].price)
                        let totalWeight1 = Number(likeAmount) * Number(info.rows[0].weight)
                        let totalVolume1 = Number(likeAmount) * Number(info.rows[0].volume)

                        totalPrice += totalPrice1
                        totalWeight += totalWeight1
                        totalVolume += totalVolume1
                    }

                }
            });
            await Promise.all(promises)

            const ordering = await db.query(`insert into orders (total_price, total_weight, total_volume, products_names, like_amount, fac_amount)
                values ($1, $2, $3, $4, $5, $6) returning order_id as id, total_price as price, total_weight as weight, 
                total_volume as volume, products_names as names, like_amount as like, fac_amount as fact`, [totalPrice, totalWeight, totalVolume, nameArr, likeAmountArr, amountArr]);

            res.json(ordering.rows[0]);
        }
        catch (e) {
            res.sendStatus(400)
        }
    }


    async getOrder(req, res) {
        try {
            const order = await db.query(`select order_id as id, total_price as price, total_weight as weight, total_volume as volume,
                products_names as names, like_amount as like, fac_amount as fact from orders`)
            res.json(order.rows)
        }
        catch (e) {
            res.sendStatus(404)
        }
    }


    async deleteOrder(req, res) {
        try {
            const id = req.params.id

            const order = await db.query(`delete from orders where order_id = $1`, [id])

            res.json(id)
        }
        catch (e) {
            res.sendStatus(404)
        }
    }
}

module.exports = new orderController()