const express = require('express');
const app = express();
const port = 8081;
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const Post = require("./models/Post")

// Config
//Template Engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
app.get("/", (req, res) => {      
    res.redirect("/home");    
});

app.get("/home", (req, res) => {  
    Post.findAll({order: [["id", "DESC"]]}).then((posts) => {
        res.render("home", {posts: posts});
    });
});

app.get("/register", (req, res) => {
    res.render("form");
});

app.post("/create-post", (req, res) => {
    Post.create({
        Title: req.body.title,
        Content: req.body.content
    }).then(() => {
        res.redirect("/home");
    }).catch((error) => {
        res.send(`Erro: ${error}`);
    });
});

app.get("/remove/:id", (req, res, next) => {
    Post.destroy({where: {'id': req.params.id}})
        .then(() => {
            res.redirect("/home");            
        })
        .catch((error) => {
            res.send(`Erro: ${error}`);            
        }
    );    
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});