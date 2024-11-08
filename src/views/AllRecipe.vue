<template>
  <div class="recipe-container">
    <!-- Search Input -->
    <div class="search-bar">
      <input 
        v-model="searchTerm" 
        type="text" 
        placeholder="Search recipes by name" 
        class="search-input"
      />
    </div>
  
    <!-- Recipe Grid -->
    <div class="recipe-grid">
      <div 
        class="recipe-card" 
        v-for="recipe in filteredRecipes" 
        :key="recipe.name"
        @click="goToRecipeDetail(recipe.name)"
      >
        <div class="recipe-header">
          <!-- Bookmark icon with click handler for instant visual feedback -->
          <i 
            :class="['bi', 'bookmark-icon', recipe.bookmarked ? 'bi-bookmark-fill' : 'bi-bookmark']" 
            @click.stop="toggleBookmark(recipe)"
          ></i>
          <h2>{{ recipe.name }}</h2>
        </div>
        <h3>by {{ recipe.author?.name || 'Unknown Author' }}</h3>
        <div class="image-container">
          <img v-if="Array.isArray(recipe.image) && recipe.image.length > 0" :src="recipe.image[0]" alt="Recipe Image" />
          <img v-else-if="typeof recipe.image === 'string'" :src="recipe.image" alt="Recipe Image" />
          <span v-else>No image available</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import recipeData from '../assets/list-recipe.json'

export default {
  name: 'AllRecipe',
  data() {
    return {
      recipes: recipeData.map(recipe => ({
        ...recipe,
        bookmarked: false // Initialize bookmarked property for each recipe
      })),
      searchTerm: '',
    }
  },
  created() {
    // Load bookmarked recipes from localStorage and update recipes' bookmarked property
    const bookmarkedRecipes = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];
    this.recipes = this.recipes.map(recipe => ({
      ...recipe,
      bookmarked: bookmarkedRecipes.some(item => item.name === recipe.name)
    }));
  },
  computed: {
    filteredRecipes() {
      return this.recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  methods: {
    goToRecipeDetail(name) {
      this.$router.push({ name: 'RecipeDetail', params: { name } });
    },
    toggleBookmark(recipe) {
      let bookmarkedRecipes = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];
      
      if (recipe.bookmarked) {
        // Unbookmark recipe and update localStorage
        bookmarkedRecipes = bookmarkedRecipes.filter(item => item.name !== recipe.name);
      } else {
        // Bookmark recipe and update localStorage
        bookmarkedRecipes.push(recipe);
      }

      // Update recipe's bookmarked property instantly
      recipe.bookmarked = !recipe.bookmarked;

      // Save updated bookmarks to localStorage
      localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarkedRecipes));
    }
  }
}
</script>

<style scoped>
.recipe-container {
  padding: 20px;
}

.search-bar {
  text-align: center;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.recipe-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: left;
  transition: transform 0.3s ease;
}

.recipe-card:hover {
  transform: scale(1.05);
}

.recipe-header {
  display: flex;
  align-items: center;
}

.bookmark-icon {
  margin-right: 10px;
  font-size: 1.5rem;
  color: #FFD700;
  cursor: pointer;
}

.bookmark-icon:hover {
  color: #ff4500;
}

.image-container img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

h3 {
  font-size: 1rem;
  color: #555;
}

span {
  color: #777;
}
</style>
