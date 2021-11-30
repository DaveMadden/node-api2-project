// implement your posts router here
const express = require('express')
const Post = require('./posts-model')
const router = express.Router()

//GET ALL POSTS
router.get('/', (req,res)=>{
    Post.find()
        .then(posts => {
            // throw new Error("RE");
            res.status(200).json(posts);
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({
                message: "The posts information could not be retrieved",
            });
        })
})

//GET POST BY (ID)
router.get('/:id', async (req,res) => {
    try {
        const blogpost = await Post.findById(req.params.id)
        if (!blogpost){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(blogpost);
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    }
})

//CREATE NEW POST
router.post('/', (req,res)=>{

    if (!req.body.title || !req.body.contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Post.insert(req.body)
            .then(blogpost => {
                res.status(201).json(blogpost);
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the post to the database"
                })
            })
    }
})

//UPDATE POST BY (ID)
router.put('/:id', async (req,res)=>{
    try {
        if(!req.body.title || !req.body.contents){
            res.status(400).json({message: "Please provide title and contents for the post"})
        } else {
            const updatedPost = await Post.update(req.params.id, req.body)
            res.status(201).json(updatedPost)
        }
    }
    catch (error) {
        res.status(500).json({ message: "The post information could not be modified" })
    }
})//this returns '1'?

//DELETE POST BY (ID)
router.delete('/:id', (req,res)=>{
    Post.remove(req.params.id)
        .then(count=>{
            if (count > 0){
                res.status(200).json({message: "she gone"})
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The post could not be removed" })
        })
})

//GET ALL COMMENTS BY (ID)
router.get('/:id/comments', async (req,res)=>{
    try {
        const comments = await Post.findPostComments(req.params.id)
        
        if (comments.length > 0){
            res.status(200).json(comments)
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
    } catch (error) {
        res.status(500).json({ message: "The comments information could not be retrieved" })
    }
})


module.exports = router;