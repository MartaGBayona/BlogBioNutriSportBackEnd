import {Schema, model} from "mongoose"

const CommentSchema= new Schema(
    {
        postId:
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },
        author:
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required:true
        },
        content:
        {
            type: String,
            required: true
        },
        verified:
        {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Comment = model("Comment", Schema)
export default Comment