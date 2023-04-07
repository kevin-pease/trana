let express = require('express');
let router = express.Router();
const data = require('./data');
const fetch = require('node-fetch');
module.exports = router;


function mid(req, res, next) {
   // todo
   next();
}

let externalExercises;

async function getExternalExercises() {
   apiUrl = 'https://wger.de/api/v2/exercise/?language=2&limit=300';
   let options = {
     method: "GET",
     headers: {
       'Content-Type': 'application/json;charset=utf-8',
     }
   }
   try {
     let response = await fetch(apiUrl, options);
     json = await response.json(); 
   } catch(e) {
       console.error('Error:' + e);
   }
   return json;

}

getExternalExercises().then(extEx => {
   externalExercises = extEx;
   console.log('* External exercises loaded.');
});


//
// ROUTES
//

// Get all externally retrieved exercises
router.get('/externalexercises', mid, async  (req, res) =>  {
   if (externalExercises) {
      res.status(200).json(externalExercises);
   } else {
      res.status(404).json({"error":"no external exercises available"});
   }
});


// Get all users
router.get('/users', mid,  (req, res) => {
   let result = data.getUsers();
   res.status(200).json(result);
});

// Insert a new user
router.post('/users', mid,  (req, res) => {
   if (req.body.username && req.body.profile_pic_id) {
      let result = data.insertUser(req.body.username, req.body.profile_pic_id);
      res.status(201).json({"userid":result});
   } else {
      res.status(400).json({"error":"invalid arguments"});
   }
});

// Edit a user
router.put('/users/:id', mid,  (req, res) => {
   if (req.body.name && req.body.profile_pic_id && req.params.id) {
      let result = data.editUser(req.params.id, req.body.name, req.body.profile_pic_id);
      res.status(200).json({});
   } else {
      res.status(400).json({"error":"invalid arguments"});
   }
});

// Get all exercises for a user
router.get('/users/:userid/exercises', mid,  (req, res) => {
   if (req.params.userid) {
      let user = data.getUser(req.params.userid);
      if (user.length == 0) {
         res.status(404).json({"error":"user not found with provided id"})
      } else {
         let result = data.getUserExercises(req.params.userid);
         if (result) {
            res.status(200).json(result);
         } else {
            res.status(404).json({"error":"no exercises found for user"})
         }
      }
   } else {
      res.status(400).json({"error":"invalid arguments"});
   }
});

// Insert a new exercise for a user
router.post('/users/:userid/exercises', mid, (req, res) => {
   if (req.params.userid && req.body.name && req.body.date) {
      let user = data.getUser(req.params.userid);
      if (user.length == 0) {
         res.status(404).json({"error":"user not found with provided id"})
      } else {
         let result = data.insertExercise(req.params.userid, req.body.name, req.body.date);
         if (result == 0) {
            return res.status(400).json({error:'TODO detailed error info'});
         } else {
            // Added succesfully
            res.status(201).json({"id":result, "userId":req.params.userid, "name":req.body.name, "date":req.body.date});
         } 
      }
   } else {
      res.status(400).json({"error":"invalid arguments"});
   }
});

// Delete an exercise
router.delete('/exercises/:id', mid, (req, res) => {
   if (req.params.id) { 
      let result = data.deleteExercise(req.params.id);
      if (result == 0) { 
         res.status(404).json({"error":'exercise not found'});
      } else {
         res.status(200).json({});
      }
   } else {
      res.status(400).json({"error":"invalid arguments"});
   }
});

// Change an exercise
router.put('/exercises/:id', mid, (req, res) => {
   if (req.params.id && req.body.name && req.body.date) { 
      let result = data.editExercise(req.params.id, req.body.name, req.body.date);
      if (result == 0) { 
         res.status(404).json({"error":"exercise not found"});
      } else {
         res.status(200).json({});
      }
   } else {
      res.status(400).json({"error":"invalid arguments"});
   }
});