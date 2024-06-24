const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
const PORT = process.env.port || 3000
app.use(cors())
//app.use('/api', )

app.listen(PORT, () => {
    console.log('Server work')
})