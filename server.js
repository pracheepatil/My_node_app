const express = require('express');
const models = require('./models');
const bodyParser = require('body-parser');
const router = require('./routes')



const PORT = 4000;

const app = express();

app.use(express.json());

app.use('/api', router);

console.log("Starting server on : ", PORT, "......")

models.sequelize.sync({alter:true}).then(() => {
    app.listen(PORT, () => {
        console.log("Server Started ");
    })
})
.catch(err => console.log("Error", err));