import { Document } from "mongoose";

export const  enum RecipeCategory {
    All="All",
    Appetizer = "Appetizer",    // מנה ראשונה
    MainCourse = "Main Course", //מנה עיקרית
    Dessert = "Dessert",        //קינוח
    Beverage = "Beverage",      //שתייה
    Snack = "Snack",            //חטיף
    Salad = "Salad",            //סלט
}

export  interface IRecipe extends Document {
    name: string;              
    category: RecipeCategory ;     
    image: string;                
    instructions: string;         
    ingredients: string[];
    like:boolean;


}