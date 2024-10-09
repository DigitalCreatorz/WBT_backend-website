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
const homerouter = require('./routers/home_routers');
const testimonailsrouter = require('./routers/tesimonails_routers');
const cityrouter = require('./routers/destination_router');
const custom_router = require('./routers/custom_package_routers');
const service_router = require('./routers/service_routers');


app.use(cors()) ;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// app.use(cors(corsOptions));


app.use(bodyParser.json());


app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/',userrouter);
app.use('/',inquiryrouter);
app.use('/',contactrouter);
app.use('/',homerouter);
app.use('/',testimonailsrouter);
app.use('/',cityrouter);
app.use('/',custom_router);
app.use('/',service_router);

connectDb().then(app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT} 👍`);
  }))


module.exports = app