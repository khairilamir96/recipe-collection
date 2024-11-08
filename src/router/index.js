import { createRouter, createWebHistory } from 'vue-router'
import AllRecipe from '../views/AllRecipe.vue' // The home page with recipes list
import RecipeDetail from '../views/RecipeDetail.vue' // The detailed page for a single recipe
import BookmarkedRecipes from '../views/BookmarkedRecipes.vue'

const routes = [
  {
    path: '/recipe',
    name: 'AllRecipe', 
    component: AllRecipe,
  },
  {
    path: '/recipe/:name', // Route for recipe detail
    name: 'RecipeDetail', // Name of the route
    component: RecipeDetail, // The component to load
    props: true, // This makes the `name` parameter available as a prop in RecipeDetail
  },
  {
    path: '/',
    name: 'BookmarkedRecipes',  // Define the new route for bookmarked recipes
    component: BookmarkedRecipes
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
