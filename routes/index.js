const express = require('express');
const Model = require('../models/index');
const passport = require('passport');
const router = express.Router();



router.get('/api/activities', passport.authenticate('basic', {session: false}) ,function (req, res) {
Model.Activity.findAll({})
.then(function(data){
  res.send({data: data})
}).catch(function(err){
console.log("err", err);
})
// res.json({"user": req.user})

    }
);


router.post('/api/activities', function(req, res){
console.log("name is", req.body.name);
Model.Activity.create({
  name: req.body.name,
  measurment: req.body.measure,

}).then(function(data){
  res.json({data: data})
  console.log("name is");
}).catch(function(err){
  console.log(err);
  res.send("error is : ", err)

})
})

router.get('/api/activities/:id', function(req, res){

  Model.Activity.findById(req.params.id)
  .then(function(data){
    res.json({data: data})
  }).catch(function(err){
    res.send("error", err)

  })

})

router.put('/api/activities/:id', function(req, res){

  Model.Activity.update({
    name: req.body.name,
    measurement: req.body.measure},

    {where: {id: req.params.id}}
  ).then(function(data){
     res.json(data).send("you updated yo")
  }).catch(function(err){
    res.status(400).send("This does not update")
  })

})

router.delete('/api/activities/:id', function(req, res){
Model.Activity.findById(req.params.id)
.then(function(data){
  Model.Activity.destroy({
    where: {id: req.params.id}
  })
  .then(function(data){
    res.json({data: data})
  }).catch(function(err){
    res.send("error", err)
  })

})
})

router.post('/api/activities/:id/stats', function(req, res){

Model.Activity.findById(req.params.activityId)
.then(function(data){
  Model.Stats.create({
    date: req.body.date,
    measurement: req.body.measure,
    activityId: req.params.id
  }).then(function(data){
    res.json(data)
  }).catch(function(err){
    res.send("error", err)
  })
})
})

router.delete('/api/stats/:id', function(req, res){

  Model.Stats.findById(req.params.id)
  .then(function(data){
    Model.Stats.destroy({
      where: {id: req.params.id}
    }).then(function(data){
      res.json(data)
    })

  })
  })


module.exports = router;
