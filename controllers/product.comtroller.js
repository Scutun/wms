const express = require('express')
const control = express()
const db = require('../db')

class productController{

    async createProduct(req, res) {
        try{
            const {name, price, wearhouse, serialNumber, line, column} = req.body
            const newProduct = await db.query(`insert into product (name, price, fk_wearhouse_id, serial_number, line, "column")
                values ($1, $2, $3, $4, $5, $6) returning product_id`, [name, price, wearhouse, serialNumber, line, column])
                
            res.json(newProduct.rows[0])    
        }

        catch(e){
            res.sendStatus(400)
        }
    }

    async getProduct(req, res) {

        try{
            const id = req.params.id
            const findProduct = await db.query(`select product_id as id, name, price, serial_number as serialNumber, line, "column" from product
                where fk_wearhouse_id = $1`, [id])
            res.json(findProduct.rows)
        }
        catch(e){
            console.log(e)
            res.sendStatus(404)
        }
    }

    async updateProduct(req, res) {
        try{
            const {id, name, price, serialNumber, line, column} = req.body

            const update = await db.query(`update product set name = $1, price = $2, serial_number = $3, line = $4, "column" = $5 
                where product_id = $6`, [name, price, serialNumber, line, column, id])

            res.json(id)
        }
        catch(e){
            res.sendStatus(400)
        }
    }

    async deleteProduct(req, res){
        try{
            const id = req.params.id
            const deleting = await db.query(`delete from product where product_id = $1`, [id])

            res.sendStatus(200)
        }
        catch(e){
            res.sendStatus(404)
        }
    }
} 

module.exports = new productController()