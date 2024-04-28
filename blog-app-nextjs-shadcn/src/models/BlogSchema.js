import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
        trim: true
    },
    content: {
        type: String,
        required: true,
        minLength: 2,
        maxLength:100000,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category:{
        type: String,
        required : true
    },
    creationTime : {
        type: String,
        required:true
    },
    
    isDeleted : {
        type : Boolean,
        required : true,
        default : false
    },
    deletedDateTime : {
        type : String
    }
})

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;