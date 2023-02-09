const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors())

app.get('/', (req,res) => {
    res.send('Welcome from Home')
})

app.get('/books', (req,res) => {
    res.send('Welcome from Books')
})

app.listen(8000, () => {
    console.log("Server is Initiating...")
})