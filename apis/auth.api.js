var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user.model');
var contact=require('../models/contact.model');



router.post('/login', function (req, res) {
    user.findOne({ email: req.body.email, password: req.body.password })
        .select('_id name email contact  password address')
        .exec(function (err, user) {
            if (err) throw err;
            // no user with that username was found
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            }
            else {
                var authObj = {
                    _id: user._id,
                    name: user.name,
                    email:user.email,
                    contact: user.contact,
                    address: user.address
                };
                // return the information including token as JSON
                res.json({
                    success: true,
                    data: authObj
                });
            }
        });
});



    router.route('/signup')
    .post(function (req, res) {
        var body = req.body;
        var obj = new user(body);
        obj.save(function (err) {
            if (err) {
                return res.send(err);
            }
            res.status(201).send();
        });
    });

    router.route('/signup').get(function (req, res) {
        user.find({}, function (err, docs) {
            if (err)
                res.status(500).send(err);
            res.send(docs);
        });
    });


router.route("/delete").post((req,res)=>
{
    //var id = mongoose.Types.ObjectId(req.body._id);
    const obj=req.body;
    console.log("satya");
   // console.log(id);
    contact.deleteOne({_id:req.body._id}).then(()=>
    {
        console.log(obj);
        res.status(201).send(obj)
    }).catch(err=>
        {
            console.log(err);
            res.status(500).send(err);
        });
    });

    

    router.route("/update").post((req,res)=>
    {
    const obj=req.body;
    console.log("satya");
    contact.findByIdAndUpdate(req.body._id,obj).then(()=>
    {
        console.log(obj);
        res.status(201).send(obj)
    }).catch(err=>
        {
            console.log(err);
            res.status(500).send(err);
        });
    });

    router.route('/search/:name/:id').get(function (req, res) {
        var name=req.params.name;
        var id=req.params.id;
        console.log(name);
        console.log(id);
    contact.find({$and:[{users:id},{ name: { $regex: name, $options: "i" } }]}, function (err, docs) {
        if (err)
            {
                console.log(err);
                res.status(500).send(err);
            }
            
        res.send(docs);
    });
});





// router.post('/signup', function (req, res) {
//     var body = req.body;
//      var obj = new product(body);
//     //role.findOne({ name: 'Admin' }, function(err, res_role) {
//     category.findOne({ name: 'HollyWood' }, function (err, res_category) {
//         if (err) return res.send(err);
//         console.log("you here");
//         obj.category= [];
//         var id = mongoose.Types.ObjectId(res_category._id);
//         obj.categoryId.push(id);
//         obj.save(function (err) {
//             if (err) {
//                 // duplicate entry
//                 if (err.code === 11000)
//                     return res.json({
//                         success: false,
//                         message: 'This username is already exists.'
//                     });
//                 return res.send(err);
//             }
//             res.status(201).send();
//         });
//     });

// });

router.route('/addcontact')
.post(function (req, res) {
    var body = req.body;
    var obj = new contact(body);
    obj.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.status(201).send();
    });
});


router.get('/getcontact/:id', function (req, res) {
    var id=req.params.id;
    contact.find({ users:id })
        .exec(function (err,docs) {
            if (err)
            res.status(500).send(err);
                res.send(docs);
});
});


router.get('/editcontact/:id', function (req, res) {
    var id=req.params.id;
    console.log(req.params.id);
    contact.findById(id).then(result=>{
        res.send(result);
    }).catch(error=>{
        console.log(error);
        res.send(error);
    })
        // .exec(function (err,docs) {
        //     if (err)
        //     res.status(500).send(err);
        //         res.send(docs);
        // });

});





module.exports = router;
