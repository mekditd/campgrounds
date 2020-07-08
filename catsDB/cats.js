const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app', { useNewUrlParser: true });

mongoose.set('useNewUrlParser', true);


var catShcema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});


var Cat = mongoose.model("Cat", catShcema);



// add new cat to db

// var Lucy = new Cat({
//     name: 'Lucy',
//     age: 11,
//     temperament: 'Grouchy'
// });

// Birke.save(function(error, cat){
//     if (error){
//         console.log('Something went wrong!');
//         console.log(err);
//     } else {
//         console.log('We have just saved Lucy to db');
//         console.log(cat);
//     }
// })

// use db.create  method to create and save a data at the same time

Cat.create({
    name: 'Jackson',
    age: 6,
    temperament: 'mild'
}, function(err, cat){
    if(err){
        console.log(err);
        console.log("something went wrong");
    }else {
        console.log(cat);
    }
})

// retrieve all cats from the db

Cat.find({},function(err, cats){
    if(err){
        console.log(err);
        console.log("something went wrong");
    } else {
        console.log(cats);
    }
})