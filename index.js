
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());


app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Status healthy',
    })
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})