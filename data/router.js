const express = require('express');

const Posts = require('./db.js');

const router = express.Router();
//Get Users

router.get('/', async (req, res) => {
  
    try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } 
  
  catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

//Get Users by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    
    if (post) {
      res.status(200).json(post);
    } 
    
    else {
      res.status(404).json({
        message: "This is not the post you're looking for. ID not found."
      })
    }
  } 
  
  catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  }
});

//Add Post

router.post('/', async (req, res) => {
    const {
      title,
      contents
    } = req.body;
    
    if (title && contents) {
      
        try {
        const post = await Posts.insert({
          title,
          contents
        });
       
        res.status(201).json(post);
        
      } 
      
      catch (error) {
        console.log(error);
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        })
      }
    } 
    
    else {
      res.status(400).json({
        errorMessage: "One does not simply 'Add a post', Please provide title and contents for the post."
      });
    }
  });
  
  //Update User by ID

  router.put('/:id', async (req, res) => {
    const {
      title,
      contents
    } = req.body;
    
    if (title && contents) {
      
        try {
        const post = await Posts.update(req.params.id, {title, contents});
        if (post > 0){
          res.status(200).json(post);
        }

        else {
          res.status(404).json({ message: "This is not the post you're looking for. The post with the specified ID does not exist." });
        }

      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: " The post information could not be modified."
        })
      }
    } else {
      res.status(400).json({ errorMessage: "One does not simply 'Update a post', Please provide title and contents for the post." })
    }
  
  });

//Delete Post by ID

  router.delete('/:id', async (req, res) => {
    
    try{
      const post = await Posts.remove(req.params.id);
      console.log(post);
      
      if(post > 0){
        res.status(200).json({message: "post deleted"})
      }
      
      else {
        res.status(404).json({ message: "This is not the post you're looking for. The post with the specified ID does not exist." });
      }
  
    } 
    
    catch (error) {
      console.log(error);
      res.status(500).json({ error: "The post could not be removed" });
    }
  });

  

module.exports = router;