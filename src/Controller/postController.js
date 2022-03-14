const postService = require('../Service/postService')

function createPost(req, res){

    var props = ["postedBy", "text"];
    var hasAll = props.every(prop => req.body.hasOwnProperty(prop));

    if(hasAll){
       postService.createPost(req.body).then((result)=>{
           if(result.status == 'success'){
               res.status(200).send(result)
           }else{
               res.status(404).send(result)
           }
        })
    }else{
        res.status(404).json({
            status:"failure",
            message:"send all required field"
        })
    }
}


function getAllPost(req, res){
    postService.getAllPost().then((result)=>{
        res.status(200).json(result)
    })
}


function getAllPostById(req, res){
    postService.getAllPostById(req.params.post_id).then((result)=>{
        res.status(200).json(result)
    })
}


function getAllPostByUser(req, res){
    postService.getAllPostByUser(req.params.postedBy).then((result)=>{
        res.status(200).json(result)
    })
}

function updatePost(req, res){
    postService.updatePost(req.body, req.params.postedBy).then((result)=>{
        if(result.status == 'success'){
            res.status(200).send(result)
        }else{
            res.status(404).send(result)
        }
    })
}

function deletePostWithId(req, res){
   
    postService.deletePostWithId(req.params.postedBy, req.params.post_id).then((result)=>{
        if(result.status == 'success'){
            res.status(200).send(result)
        }else{
            res.status(404).send(result)
        }
    })
}


function getUserFeed(req, res){
  
    postService.getUserFeed(req.body).then((result)=>{
        res.status(200).json(result)
    })
}


module.exports = {createPost, getAllPost, updatePost, getAllPostById, deletePostWithId, getAllPostByUser, getUserFeed}