const postDao = require('../Dao/postDao')
const { v4: uuidv4 } = require('uuid'); 

function compareStrings(a, b) {
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }


async function createPost(postDetail){

    const postData={
        post_id: uuidv4(),
        postedBy: postDetail.postedBy,
        text: postDetail.text,
        createdAt: new Date().toISOString()
    }
    let result = await postDao.createPost(postData)
    console.log(result)
    if(result.acknowledged && result.insertedId){
        return {
            status: 'success',
            message: 'post added for user '+ postData.postedBy
        }
    }else{
        return {
            status: 'failure',
            message: 'post not added'
        }
    }
}

async function getAllPost(){
   let result = await postDao.getAllPost()
 
   reverseResult = result.sort(function(a, b){
    return compareStrings(b.createdAt, a.createdAt)
    });
    return reverseResult
}

async function getAllPostById(post_id){
   let result = await postDao.getAllPostById(post_id)
    return result
}

async function getAllPostByUser(userName){
   let result = await postDao.getAllPostByUser(userName)
    return result
}

async function updatePost(updatedPost, postedBy){
   let result = await postDao.updatePost(updatedPost, postedBy)
   
   if(result.lastErrorObject.updatedExisting && result.value){
    return{
        status:'success',
        message:'post updated'
        }
    }else{
        return{
            status:'failure',
            message:'error in udpating the post'
        }
    }
}

async function deletePostWithId(postedBy, post_id){
   
   let result = await postDao.deletePostWithId(postedBy, post_id)
  
   if(result.lastErrorObject.n && result.value){
    return{
        status:'success',
        message:'post deleted'
        }
    }else{
        return{
            status:'failure',
            message:'error in deleting the post'
        }
    }
}

async function getUserFeed(follwings){
   let result = await postDao.getUserFeed(follwings)
    return result
}

module.exports = {createPost, getAllPost, updatePost, getAllPostById, deletePostWithId, getAllPostByUser, getUserFeed}