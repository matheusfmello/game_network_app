const express = require('express');
const cookieParser = require('cookie-parser')
const connectDB = require('./db_connection');
const auth_middleware = require('./routes/check_auth')
const games_route = require('./routes/games');
const login_route = require('./routes/login');
const account_route = require('./routes/account');
const user_route = require('./routes/user');
const app = express();
const cors = require('cors');
const port = 3333;

connectDB()
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use('/check-auth', auth_middleware)

app.use('/account', account_route);
app.use('/games', games_route);
app.use('/login', login_route);
app.use('/user', user_route);

// Static data to retrieve images to the frontend
app.use('/images', express.static('server/data/images'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});