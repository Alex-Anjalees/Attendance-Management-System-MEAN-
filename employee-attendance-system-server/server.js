const cookieSession = require('cookie-session');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        name: "Alex-Anjalees-session",
        secret: "COOKIE_SECRET",
        httpOnly: true,
    })
);
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronized');
    initial();
});
async function initial() {
    try {
        await Role.findOrCreate({
            where: { id: 1 },
            defaults: { name: "user" }
        });

        await Role.findOrCreate({
            where: { id: 2 },
            defaults: { name: "moderator" }
        });

        await Role.findOrCreate({
            where: { id: 3 },
            defaults: { name: "admin" }
        });
        console.log('Roles created or already exist in the database.');
    } catch (error) {
        console.error('Error initializing roles:', error.message);
    }
}
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});