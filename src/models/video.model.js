import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
-mongooseAggregatePaginate


const videoSchema = new Schema (
    {
        videoFile:{
            type: String,
            required:true
        },
        thumbnail:
        {
            type:String,
            required:true
        },
        title:
        {
            type:String,
            required:true
        },
        description:
        {
            type:String,
            required:true
        },
        duration:
        {
            type:Number,
            required:true
        },
        views:
        {
            type:Number,
            required:true
        },
        isPublished:
        {
            type:String,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectID,
            ref:"User"
        }



    },
    {
        timestamps:true
    }
)


videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)


