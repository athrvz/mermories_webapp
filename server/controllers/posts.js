import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"; // access the model


export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    
    try {
        await newPost.save();
        console.log("new post created");
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    // Get the post id from params
    const { id: _id } = req.params;
    const post = req.body;
    // Check if its valid
    if(!mongoose.Types.ObjectId.isValid(_id)) 
        return res.status(404).send("No post with that id");

    // Update 
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id");

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully" });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send("No posts with that id");

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true });

    res.json(updatedPost);
}


// import PostMessage from "../models/postMessage.js";


// export const getPosts = async (req, res) => {
//     try {
//         const postMessages = await PostMessage.find();
//         console.log(postMessages);
    
//         res.status(200).json(postMessages);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// export const createPost = async (req, res) => {
//     // post req has body access
//     const post = req.body;

//     const newPost = new PostMessage(post);

//     try {
//         await newPost.save();
//         res.status(200).json(newPost);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }