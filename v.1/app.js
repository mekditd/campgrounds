var express = require("express");
app = express();
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("landing.ejs");
})

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon Creek", image: "https://pixabay.com/get/57e6d7454e53ae14f1dc84609620367d1c3ed9e04e50744076277ddd9349cc_340.jpg"},
        {name: "Granite Hill", image: "https://pixabay.com/get/54e5d4414356a814f1dc84609620367d1c3ed9e04e50744076277ddd9349cc_340.jpg"},
        {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/55e7d24a485aac14f1dc84609620367d1c3ed9e04e50744076277ddd9349cc_340.jpg"}
    ]
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.listen(3000, function(){
    console.log("Server is listening on port 3000!");
})