var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var session = require('session');

var app = express();

app.set('view enigine', 'ejs');
app.set('views', path.join(__dirname + './views'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist'))

mongoose.connect('mongodb://localhost/belt_exam');
mongoose.Promise = global.Promise; 

//////schema goes here

var PetshopSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: [true, "You need to enter name"],
        minlength: [3, 'name must be at least 3 characters']
    },
    type: {
        type: String,
        require: [true, 'you have to name type'],
        minlength: [3, 'type name must be at least 3 characters']
    },
    description: {
        type: String,
        require: [true, 'you have to have description'],
        minlength: [3, 'type name must be at least 3 characters']
    },
    skillOne: {
        type: String,
    },
    skillTwo: {
        type: String,
    },
    skillThree: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

mongoose.model('Petshop', PetshopSchema);
var Petshop = mongoose.model("Petshop")


app.get('/petshop', function(req, res) {  /////////view all
    Petshop.find({}, function(err, petshop) {
        if(err) {
            console.log('something went wrong', err);
            res.json({message: "error", error: err});
        } else {
            console.log('success');
            res.json({message: 'success', petshop: petshop});
        }
    })
})

app.post('/petshop', function(req, res) {   ////////////make new 
    console.log("POST DATA", req.body);
    var petshop = new Petshop(req.body);
    petshop.save(function(err) {
        if(err) {
            console.log('something went wrong', err);
            res.json({message: "error", error: err});
        } else {
            console.log('successfully added a pet!');
            res.json({message: 'successfully added pet '});
        }
    })
})

app.get('/petshop/:id', function(req, res) {  ////////// get by id
    console.log(req.params.id);
    Petshop.find({_id:req.params.id}, function(err, petshop) {
        if(err) {
            console.log('something went wrong', err);
            res.json({message: "db error", error: err});
        } else {
            console.log('pets:', petshop);
            if (petshop.length == 0) {
                console.log('petshop not found');
                res.json({message: 'petshop not found', petshop: petshop});
            }
            else {
                console.log('successfully found the petshop!');
                res.json({message: 'successfully found petshop ', petshop: petshop});
            }
        }
    })
})



app.put('/petshop/:id', function(req, res) {  //////////   update 
    var obj = {};
    if (req.body[0].name) {
        obj['name'] = req.body[0].name;
        obj['type'] = req.body[0].type;
        obj['description'] = req.body[0].description;
        obj['skillOne'] = req.body[0].skillOne;
        obj['skillTwo'] = req.body[0].skillTwo;
        obj['skillThree'] = req.body[0].skillThree;
    }
  
    Petshop.update({_id:req.params.id}, {
        $set: obj
    }, function(err, pet) {
        if(err) {
            console.log('something went wrong', err);
            res.json({message: "db error", error: err});
        } else {
            res.json({message: 'didnt do shit', data: pet});
        }
    })
})

app.put('/petshop/like/:id', function(req, res) {
    Petshop.update({_id:req.params.id}, {$inc: {"likes": +1 }
    }, function(err, pet) {
        if(err) {
            console.log('something went wrong', err);
            res.json({message: "db error", error: err});;
        } else {
            res.json({message: 'added like', data: pet});
        }
    })
})

app.delete('/petshop/:id', function(req, res) { ////////// delete
    Petshop.remove({_id:req.params.id}, function(err) {
        if(err) {
            console.log('something went wrong', err);
            res.json({message: "db error", error: err});
        } else {
            console.log('successfully removed petshop!');
            res.json({message: 'successfully removed petshop '});
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});

app.listen(8000, function() {
    console.log('running this express project on port 8000')
})