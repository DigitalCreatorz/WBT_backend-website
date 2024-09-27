require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const connectDb = require('./utils/db')
const path = require('path');
const bodyParser = require('body-parser');
const userrouter = require('./routers/user_routers');
const inquiryrouter = require('./routers/inquiry_routers');
const contactrouter = require('./routers/contact_routers');


app.use(cors()) ;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// app.use(cors(corsOptions));


app.use(bodyParser.json());


app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/',userrouter);
app.use('/',inquiryrouter);
app.use('/',contactrouter);

connectDb().then(app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT} 👍`);
  }))


module.exports = app