require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
YAML = require('yamljs');
swaggerDoc = YAML.load('./swagger.yml');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin:'*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))


//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server up and running on http://localhost:${PORT}`))

require('./configurations/db.config');

const userRoutes = require("./routes/user.route");
app.use("/api/user", userRoutes);

const authRoutes = require("./routes/auth.route");
app.use("/api/auth", authRoutes);

module.exports = app;

// secert github
// mise en resau publique de la db a desactiver