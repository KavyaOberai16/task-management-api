require('dotenv').config();
const app = require('./app');

const pool = require('./config/pg');
const connectMongo = require(`./config/mongo`);

//mongodb connected to server
const PORT = process.env.PORT || 5000;
connectMongo();
//PostgreSQL connected to server
pool.connect()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.log(err));

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
