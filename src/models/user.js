import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.*\@.*\..*/, "Please fill a valid email form"]
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
        birth: {
            type: Date
        },
        posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
    }
)
UserSchema.pre('remove', async (next)=> { //cascading
    await this.model("Post").deleteMany({author: this._id})
    await this.model("Comment").deleteMany({author: this._id})
    next();
})


const User = mongoose.model('User', UserSchema)

export default User