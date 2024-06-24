import mongoose, {Schema} from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:
        {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:
        {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            
        },
        fullname:
        {
            type:String,
            required:true,
            trim:true,
            index: true
        },
        avatar:

        {
            type:String,
            required:true,
        },
        coverImage:
        {
            type:String,

        },
        watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:
    {
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:
    {
        type:String,
    }

},
{
    timestamps:true
}
)

// this is used to take password from userSchema and encrypt and save it
// brcypt library can hash and chek passwords 
// jwt is a bearer token  means like a key  it will provide you password 

userSchema.pre("save", async function (next){    
    if(!this.isModified("password")) return next();
    
    this.password =bcrypt.hash(this.password,10)  
    next()

})

userSchema.methods.isPasswordCorrect = async function (password)
{
     return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAcessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email: this.email,
            username: this.username,
            fullname : this.fullname
        },
        process.env.ACESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken= function()
{
    return jwt.sign(
        {
            _id:this._id,
          
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const  User = mongoose.model("User",userSchema)