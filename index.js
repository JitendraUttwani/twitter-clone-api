const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('./knexfile');
const { authenticateToken } = require('./src/middlewares/authMiddleware');



dotenv.config();


const knex = Knex(knexConfig.development);

Model.knex(knex);


const app = express();



app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());



app.use('/api/v1/auth', authRoutes);
app.use(authenticateToken)
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/post', postRoutes);


app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Status healthy',
    })
})



app.get('/api/v1/*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Page not found',
    })
})


const port = 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})