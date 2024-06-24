require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const wearhouseRoute = require('./routes/wearhouse.routes')




app.use(express.json())
const PORT = process.env.port || 3000
app.use(cors())
app.use('/api', wearhouseRoute)




app.listen(PORT, () => {
    console.log('Server work')
})