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

const sequelize = require('./configurations/db.config');


const User = require('./models/user.model');
const Content = require('./models/content.model');
const Comment = require('./models/comment.model');
const Follow = require('./models/follow.model');

User.hasMany(Content, { foreignKey: 'userId' });
Content.belongsTo(User, { foreignKey: 'userId' });

Content.hasMany(Comment, { foreignKey: 'contentId' });
Comment.belongsTo(Content, { foreignKey: 'contentId' });

User.hasMany(Follow, { foreignKey: 'userId' });
Follow.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Follow, { foreignKey: 'userFollowedId' });
Follow.belongsTo(User, { foreignKey: 'userFollowedId' });

sequelize.sync().then(() => {
    console.log('tables created successfully!');
}).catch((error) => {
    console.error('Unable to create tables : ', error);
});


const authRoutes = require("./routes/auth.route");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/user.route");
app.use("/api/user", userRoutes);

const contentRoutes = require("./routes/content.route");
app.use("/api/content", contentRoutes);

const commentRoutes = require("./routes/comment.route");
app.use("/api/comment", commentRoutes);

const followRoutes = require("./routes/follow.route");
app.use("/api/follow", followRoutes);

module.exports = app;


// mise en resau publique de la db a desactiver