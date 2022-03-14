const MongoUtils = require('../Utils/databaseUtils')

async function createPost(postDetail){
    let db = await MongoUtils.getDBConnecton()
    let result = await db.collection('posts').insertOne(postDetail)
    return result
}

async function getAllPost(){
    let db = await MongoUtils.getDBConnecton()
    let result = await db.collection('posts').find().toArray()
    return result
}

async function getAllPostById(post_id){
    let db = await MongoUtils.getDBConnecton()
    let result = await db.collection('posts').findOne({post_id: post_id})
    return result
}

async function getAllPostByUser(userName){
    let db = await MongoUtils.getDBConnecton()
    let result = await db.collection('posts').find({postedBy: userName}).toArray()
    return result
}

async function updatePost(updatedPost, postedBy){
    let db = await MongoUtils.getDBConnecton()
    let result = await db.collection('posts').findOneAndUpdate(
            {postedBy:postedBy},
            {$set: {text: updatedPost.text}}
    )
    return result
}

async function deletePostWithId(postedBy, post_id){
    
    let db = await MongoUtils.getDBConnecton()
    result = db.collection('posts').findOneAndDelete({
        post_id:post_id,
        postedBy: postedBy
    })
    return result
}


async function getUserFeed(payload){
    let offset = ((+payload.pageLimit.offset)-1)*(+payload.pageLimit.limit)
    let limit = +payload.pageLimit.limit
    let db = await MongoUtils.getDBConnecton()
    let result = await db.collection('posts').find({postedBy: {$in: payload.allFollowings}}).sort({createdAt: -1}).skip(offset).limit(limit).toArray()
    return result
}


module.exports = {createPost, getAllPost, updatePost, getAllPostById, deletePostWithId, getAllPostByUser, getUserFeed}