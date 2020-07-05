var express = require("express");
var app = express();
var bodyParser = require("body-parser")



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/57e6d7454e53ae14f1dc84609620367d1c3ed9e04e50744076277ddd9349cc_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/54e5d4414356a814f1dc84609620367d1c3ed9e04e50744076277ddd9349cc_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d7444251ae14f1dc84609620367d1c3ed9e04e50744076277ddd9349cc_340.jpg"}
]


app.get("/", function(req, res){
    res.render("landing.ejs");
})

app.get("/campgrounds", function(req, res){

    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){

    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};

    campgrounds.push(newCampground);

    // redirect backt to campgrounds page
    res.redirect("/campgrounds");

})

app.get("/campgrounds/new", function(req, res){
    res.render("new")
})

app.listen(3000, function(){
    console.log("Server is listening on port 3000!");
})