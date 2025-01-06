import Blog from "../models/blogModel.js";
import * as mongoose from 'mongoose';

export const createBlog = async (req, res)=>{
    const {title, body, author, category} = req.body;

    if(!title || !body || !author || !category){
        return res.status(400).json({message: 'All fields are required'})
    }
    try {
        const blog = await Blog.create({title, body, author, category});
        res.status(201).json({blog});

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const getBlogs = async (req, res)=>{
    try {
        const blogs = await Blog.find();
        res.status(200).json({blogs});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const getBlog = async (req, res)=>{
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: 'Blog not found'})
        }
        const blog = await Blog.findById(id);
        res.status(200).json({blog});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}   

export const updateBlog = async (req, res)=>{
    const {id} = req.params;
    const {title, body, author, category} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: 'Blog not found'})
        }
        const blog = await Blog.findById(id);

        const newBlog = await Blog.findByIdAndUpdate(id, {
            title: title || blog.title,
            body: body || blog.body,
            author: author || blog.author,
            category: category || blog.category
        }, {new: true});
        res.status(200).json({newBlog});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteBlog = async (req, res)=>{
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: 'Invalid blog id'})
        }
        const blog = await Blog.findByIdAndDelete(id);

        if(!blog){
            return res.status(404).json({message: 'Blog not found'})
        }

        res.status(200).json({message: "Blog deleted successfully"});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}