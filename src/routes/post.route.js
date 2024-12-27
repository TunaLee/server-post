import express from "express";
import Post from "../models/post.js";
import User from "../models/user.js";
import CommentRouter from "./comment.route.js"
import Comment from "../models/comment.js";

const router = express.Router();



router.post('/', async (req, res)=>{ //post {title, content, userId}
    const {title, content, userId} = req.body

    const user = await User.findById(userId)

    const createPost = await Post.create({
        title,
        content,
        author: userId
    })

    user.posts.push(createPost._id)
    await user.save()

    // const createPost = new Post(req.body)
    // await createPost.save()

    res.status(201).json(createPost)
})

router.get('/', async (req, res)=> { //get all
    const {title, content, likes, createdAt} = req.query
    const findPosts = await Post.find({
        // title: {$regex: `.*${title}.*`, $options: 'i'}
        // likes: {$exists: false}
        // createdAt: {$gt: createdAt}
    }).populate("author", "username")
    console.log(title)
    res.status(200).json(findPosts)
})

router.get('/:id', async (req, res)=> { //get by id 
    // const findPost = await Post.findById(req.params.id)
    const findPost = await Post.findOne({
        _id: req.params.id
    })
    res.status(200).json(findPost)
})

router.put('/:id', async (req, res)=>{
    // const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    //     returnDocument: "after"
    // })
    const updatePost = await Post.updateOne({
        _id: req.params.id
    }, req.body)
    res.status(200).json(updatePost)
})

router.delete('/:id', async (req, res)=>{
    const deletePost = await Post.findByIdAndDelete(req.params.id)
    await User.findByIdAndUpdate(deletePost.author, {
        $pull: {posts: deletePost._id}
    })
    await Comment.deleteMany({post: this._id})
    res.status(204).json(deletePost)
})
router.use('/:postId/comments', CommentRouter)

export default router