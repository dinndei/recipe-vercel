import  IRecipe  from "@/app/types/recipe";
import mongoose, { Model, Schema } from "mongoose";

const IRecSchema: Schema<IRecipe> = new Schema({
    name: {type:String,required:true,unique:true},              
    category: {type:String,enum:["Appetizer","Main Course","Dessert","Beverage","Snack","Salad"],required:true},   
    image:  {type:String,required:true},         
    instructions:{type:String,required:true},         
    ingredients: {type:[String],default:[],required:true},
    like:{type:Boolean,default:false}

})

const Recipe: Model<IRecipe> = mongoose.models.Recipe || mongoose.model("Recipe", IRecSchema);

export default Recipe;