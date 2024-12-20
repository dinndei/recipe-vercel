 import { IRecipe, RecipeCategory } from "../types/recipe";


// //מייצרת פונקצית מיון ע"פ פונקציה שהיא מקבלת בפרמטרים
// const filterByFn = (items: IRecipe[], filter: (item: IRecipe) => boolean): IRecipe[] => {
//   return items.filter(filter);
// }

// export const filterByLikes = (items: IRecipe[]): IRecipe[] => {
//   console.log("in filter by likes",items);
  
//   return filterByFn(items, (item) => item.like === true);

// }

// export const filterByCategory = (items: IRecipe[], category: RecipeCategory): IRecipe[] =>{
//  return category=="All"? items:
//   filterByFn(items, (item) => item.category === category);

// }

// export const filterByQuery = (items: IRecipe[], query: string): IRecipe[] =>{
//   console.log("items in filter by category",items);
//   console.log("in filter category",query);
//   return filterByFn(items, (item) =>
//     new RegExp(query, 'i').test(item.name) ||
//     new RegExp(query, 'i').test(item.category) ||
//     new RegExp(query, 'i').test(item.instructions)
//   );
// }

export const filterRecipes = ({
  items,
  category,
  query,
  onlyLiked,
}: {
  items: IRecipe[];
  category?: RecipeCategory;
  query?: string;
  onlyLiked?: boolean;
}): IRecipe[] => {
  return items
    .filter((item) => {
      // Filter by category if provided
      if (category && category !== "All") {
        return item.category === category;
      }
      return true;
    })
    .filter((item) => {
      // Filter by likes if onlyLiked is true
      if (onlyLiked) {
        return item.like === true;
      }
      return true;
    })
    .filter((item) => {
      // Filter by query if provided
      if (query && query.trim()) {
        const regex = new RegExp(query, "i");
        return (
          regex.test(item.name) ||
          regex.test(item.category) ||
          regex.test(item.instructions)
        );
      }
      return true;
    });
};
