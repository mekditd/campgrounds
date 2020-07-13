var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v4", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// seedDB();


// Campground.create(
//     {
//         name: "Salmon Creek", 
//         image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//         description: "Nice fishing exprience to those who like the lifestyle!"
//     }, function(err, campground){
//         if(err){
//             console.log("Something went wrong!");
//             console.log(err);
//         } else {
//             console.log("We just added new campground: ");
//             console.log(campground)
//         }
//     }
// )

app.get("/", function (req, res) {
  res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function (req, res) {
  //Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      // console.log(allCampgrounds);
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

// CREATE - add new campground to DB
app.post("/campgrounds", function (req, res) {
  // get data from form and add to db
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = { name: name, image: image, description: description };

  // create new campground and save to db

  Campground.create(newCampground),
    function (err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        // redirect back to campgrounds page
        res.redirect("/campgrounds");
      }
    };
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function (req, res) {
  res.render("new");
});

// SHOW - shows more info about one campground

app.get("/campgrounds/:id", function (req, res) {
  // find the campground with provided id
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        // render show template with that campground
        res.render("show", { campground: foundCampground });
      }
    });
});

app.listen(3004, function () {
  console.log("Server is listening on port 3004!");
});
