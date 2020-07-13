var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v3", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// seedDB();

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

app.listen(3000, function () {
  console.log("Server is listening on port 3000!");
});
