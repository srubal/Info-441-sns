import mongoose from "mongoose"

dbConnect(() => {return "{status:'success'}"}).catch(err => {return "{status:'error', error:'" + err + "'}"});

var Post;
var Course;

async function dbConnect() {
    
}