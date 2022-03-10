import mongoose from "mongoose"
import key from "./db_key.js"

dbConnect(() => {return "{status:'success'}"}).catch(err => {return "{status:'error', error:'" + err + "'}"});

async function dbConnect() {
    mongoose.connect(key);
    console.log("Connected to DB");
    const postSchema = new mongoose.Schema({
        courseID: String,
        title: String,
        content: String,
        likes: Array,
        dislikes: Array,
        created_date: String,
        uid: String
    })
    Post = mongoose.model('Post', postSchema);
    const courseSchema = new mongoose.Schema({
        name: String,
        professor: String,
        description: String,
        numLikes: Number,
        numDislikes: Number,
        uid: String
    })
    Course = mongoose.model('Course', courseSchema);
    const accountSchema = new mongoose.Schema({
        permissions: String,
        role: String,
        emailHash: String
    })
    Account = mongoose.model('Account', accountSchema);
    console.log("created db schemas and models");
}

export var Course;
export var Account;
export var Salt;
export var Post;