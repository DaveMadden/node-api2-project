// implement your posts router here
const express = require('express')
const Post = require('./posts-model')
const router = express.Router()

//GET ALL POSTS
router.get('/', (req,res)=>{
    Post.find()
        .then(posts => {
            // throw new Error("REKT");
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

//CREATE NEW POST

//UPDATE POST BY (ID)

//DELETE POST BY (ID)

//GET ALL COMMENTS BY (ID)


module.exports = router;