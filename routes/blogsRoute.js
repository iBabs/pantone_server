import { Router } from "express";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controllers/blogController.js";
import authenticate from "../middleware/authenticate.js";

const blogsRoute = Router();

blogsRoute.get("/", authenticate,getBlogs);

blogsRoute.get("/:id", authenticate,getBlog);

blogsRoute.post("/", authenticate , createBlog);

blogsRoute.patch("/:id", authenticate,updateBlog);

blogsRoute.delete("/:id", authenticate, deleteBlog);

export default blogsRoute;