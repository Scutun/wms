require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const wearhouseRoute = require('./routes/wearhouse.routes')
const productRoute = require('./routes/product.routes')
const orderRoute = require('./routes/order.routes')




app.use(express.json())
const PORT = process.env.port || 3000
app.use(cors())
app.use('/api', wearhouseRoute)
app.use('/api', productRoute)
app.use('/api', orderRoute)



app.listen(PORT, () => {
    console.log('Server work')
})