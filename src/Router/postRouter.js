const express = require("express")
const postRouter = express.Router()
const postController = require('../Controller/postController')

function createPost(req, res){
    postController.createPost(req, res)
}

function getAllPost(req, res){
    postController.getAllPost(req, res)
}

function getAllPostById(req, res){
    postController.getAllPostById(req, res)
}

function getAllPostByUser(req, res){    
    postController.getAllPostByUser(req, res)
}

function updatePost(req, res){
    postController.updatePost(req, res)
}

function getUserFeed(req, res){
    postController.getUserFeed(req, res)
}

function deletePostWithId(req, res){
    postController.deletePostWithId(req, res)
}

postRouter.post('/create',createPost)
postRouter.get('/all',getAllPost)
postRouter.get('/:post_id',getAllPostById)
postRouter.get('/postedby/:postedBy',getAllPostByUser)
postRouter.put('/update/:postedBy',updatePost)
postRouter.delete('/delete/:postedBy/:post_id',deletePostWithId)

postRouter.post('/feed',getUserFeed)


module.exports = postRouter

