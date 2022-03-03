import mongoose from "mongoose"

dbConnect(() => {return "{status:'success'}"}).catch(err => {return "{status:'error', error:'" + err + "'}"});

var Post;
export var Course;
export var Account;
export var Salt;

async function dbConnect() {
    mongoose.connect("mongodb+srv://ssrubal:Lh2zmcJfHukGBBWi@cluster0.wcu0h.mongodb.net/sns?retryWrites=true&w=majority")
    console.log("Connected to DB");
    const postSchema = new mongoose.Schema({
        courseID: String,
        title: String,
        content: String,
        likes: Array,
        dislikes: Array,
        created_date: Date
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

export default Post;