const database = require("../config/database");

const postage = database.sequelize.define("Post", {
    Title: {
        type: database.Sequelize.STRING
    },
    Content: {
        type: database.Sequelize.TEXT
    }
});

//postage.sync({force: true});

module.exports = postage;