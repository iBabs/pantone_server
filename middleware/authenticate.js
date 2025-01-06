import jwt from "jsonwebtoken";
import Author from "../models/authorModel.js";

const authenticate = async (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: "You must be logged in to access this route"});
    }
    //"Bearer iuhisduhf9wihf9iwfhpiwehfuiweufh0pih208347rt6r8h23rugibhf"
    const token = authorization.split(" ")[1];
    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        const author = await Author.findById(id)

        if(!author){
            return res.status(401).json({error: "You must be logged in to access this route"});
        }

        req.author = author;

        next();

    } catch (error) {
        res.status(401).json({error: "You must be logged in to access this route"});
    }
}

export default authenticate;