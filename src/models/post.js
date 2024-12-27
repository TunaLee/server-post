import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: String,
        likes: {
            type: Number,
            default: 0
        },
        views: {
            type: Number,
            default: 0
        },
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
        author: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    },
    {
        timestamps: true
    }
)
PostSchema.pre('findByIdAndDelete', async function(next){ //cascading
    console.log('running remove')
    const user = await this.model("User").findByIdAndUpdate(this.author, {
        $pull: {posts: this._id}
    })
    // user.posts.pull(this._id)
    // await user.save()

    await this.model("Comment").deleteMany({author: this._id})
    next();
})


const Post = mongoose.model('Post', PostSchema)

export default Post