<template>
  <div class="bookmarked-recipes">
    <h1>Bookmarked Recipes</h1>

    <!-- Search Input -->
    <div class="search-bar">
      <input v-model="searchTerm" type="text" placeholder="Search bookmarked recipes by name..." class="search-input" />
    </div>

    <div class="recipe-grid">
      <div class="recipe-card" v-for="recipe in filteredBookmarkedRecipes" :key="recipe.name"
        @click="goToRecipeDetail(recipe.name)">
        <div class="recipe-header">
          <!-- Bookmark icon (filled if bookmarked) -->
          <i class="bi bi-bookmark-fill bookmark-icon" @click.stop="unBookmarkRecipe(recipe)"></i>
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
export default {
  name: 'BookmarkedRecipes',
  data() {
    return {
      bookmarkedRecipes: [],
      searchTerm: '' // New data property for search input
    }
  },
  created() {
    // Load bookmarked recipes from localStorage
    const storedRecipes = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];
    this.bookmarkedRecipes = storedRecipes;
  },
  computed: {
    filteredBookmarkedRecipes() {
      // Filter bookmarked recipes based on search term (case-insensitive)
      return this.bookmarkedRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  methods: {
    goToRecipeDetail(name) {
      this.$router.push({ name: 'RecipeDetail', params: { name } });
    },
    unBookmarkRecipe(recipe) {
      // Remove recipe from localStorage and update array
      let storedRecipes = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];
      storedRecipes = storedRecipes.filter(item => item.name !== recipe.name);

      this.bookmarkedRecipes = storedRecipes;
      localStorage.setItem('bookmarkedRecipes', JSON.stringify(storedRecipes));
    }
  }
}
</script>

<style scoped>
.bookmarked-recipes {
  padding: 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
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
  /* Gold color for the filled bookmark icon */
  cursor: pointer;
}

.bookmark-icon:hover {
  color: #ff4500;
  /* Change color on hover for better UI feedback */
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
