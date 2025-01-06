import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

authorSchema.statics.signUp = async function(first_name, last_name, username, email, password){
        if(!first_name || !last_name || !username || !email || !password){
            throw Error("All fields must be filled");
        }
        if(!validator.isEmail(email)){
            throw Error("Invalid email");
        }
        if(!validator.isStrongPassword(password)){
            throw Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character");
        }
        const exists = await this.findOne({email});
        if(exists){
            throw Error("Email already in use");
        }
        const usernameExists = await this.findOne({username});
        if(usernameExists){
            throw Error("Username already in use");
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const author = await this.create({first_name, last_name, username, email:email.toLowerCase(), password: hash});

        return author;

}

authorSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error("All fields must be filled");
    }
    const author = await this.findOne({email});
    if(!author){
        throw Error("Incorrect email");
    }
    const match = await bcrypt.compare(password, author.password);

    if(!match){
        throw Error("Incorrect password");
    }
    return author;
}




const Author = mongoose.model("Author", authorSchema);
export default Author;