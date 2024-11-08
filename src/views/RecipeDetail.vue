<template>
  <div class="recipe-detail">
    <div class="recipe-container">
      <!-- Recipe Image and Author/Published Info on the Left -->
      <div class="left-side">
        <div class="image-container">
          <img v-if="recipe.image?.[0]" :src="recipe.image[0]" alt="Recipe Image" class="recipe-image" />
        </div>
        <div class="author-info">
          <p class="author"><strong>Author:</strong> {{ recipe.author?.name || 'Unknown Author' }}</p>
          <p><strong>Published Date:</strong> {{ formattedDate }}</p>
          <p><strong>Category:</strong>
            <span v-if="Array.isArray(recipe.recipeCategory)">
              <!-- Join array elements with commas -->
              {{ recipe.recipeCategory.join(', ') }}
            </span>
            <span v-else>
              {{ recipe.recipeCategory }}
            </span>
          </p>
        </div>
      </div>
      
      <!-- Recipe Information on the Right -->
      <div class="recipe-info">
        <!-- Bookmark Icon -->
        <i 
          :class="isBookmarked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'" 
          class="bookmark-icon"
          @click="toggleBookmark"
        ></i>

        <h1>{{ recipe.name }}</h1>

        <!-- Description Section -->
        <div class="description">
          <p><strong>Description:</strong> {{ recipe.description }}</p>
        </div>

        <!-- Ingredients Section -->
        <div class="ingredients">
          <h3><b>Ingredients</b></h3>
          <ul>
            <li v-for="(ingredient, index) in recipe.recipeIngredient" :key="index">- {{ ingredient }}</li>
          </ul>
        </div>

        <!-- Instructions Section -->
        <div class="instructions">
          <h3><b>Instructions</b></h3>
          <ol>
            <li v-for="(step, index) in recipe.recipeInstructions" :key="index">{{ step.text }}</li>
          </ol>
        </div>
      </div>
    </div>

    <!-- Back Button in Top Right Corner -->
    <button @click="goBack" class="go-back-button">Back</button>
  </div>
</template>

  
<script>
import recipeData from '../assets/list-recipe.json';

export default {
  props: ['name'],
  data() {
    return {
      recipe: null,
      isBookmarkedState: false // Track bookmark state reactively
    };
  },
  created() {
    this.recipe = recipeData.find(r => r.name === this.name);
    this.checkIfBookmarked(); // Set initial bookmark state
  },
  computed: {
    formattedDate() {
      const date = new Date(this.recipe.datePublished);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    },
    isBookmarked() {
      // Return the current reactive bookmark state
      return this.isBookmarkedState;
    }
  },
  methods: {
    checkIfBookmarked() {
      // Check if the recipe is already bookmarked and set state accordingly
      const bookmarkedRecipes = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];
      this.isBookmarkedState = bookmarkedRecipes.some(r => r.name === this.recipe.name);
    },
    toggleBookmark() {
      let bookmarkedRecipes = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];

      if (this.isBookmarked) {
        // Remove from bookmarks
        bookmarkedRecipes = bookmarkedRecipes.filter(r => r.name !== this.recipe.name);
        this.isBookmarkedState = false; // Update reactive state
      } else {
        // Add to bookmarks
        bookmarkedRecipes.push(this.recipe);
        this.isBookmarkedState = true; // Update reactive state
      }

      // Update localStorage
      localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarkedRecipes));
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>


  
  <style scoped>
  .recipe-detail {
    font-family: Arial, sans-serif;
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: relative; /* Added position relative to contain the absolute positioning of the button */
  }
  
  .recipe-container {
    display: flex;
    flex-direction: row;
    gap: 20px; /* Add space between image and text */
  }
  
  .left-side {
    flex: 0 0 250px; /* Fixed size for image and author info */
    text-align: center;
  }
  
  .image-container {
    margin-bottom: 20px;
  }
  
  .recipe-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .author-info {
    text-align: left;
  }
  
  .author-info p {
    font-size: 1rem;
    color: #555;
  }
  
  .recipe-info {
    flex-grow: 1; /* Take up the remaining space */
    text-align: left; /* Align text to the left */
  }
  
  .recipe-info h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .description p {
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .ingredients, .instructions {
    margin: 20px 0; 
  }

  .ingredients ul {
  list-style-type: disc; /* Bullet points for each ingredient */
  padding-left: 20px;    /* Indentation for the list */
  margin: 0;             /* Remove any default margin */
  display: block;        /* Ensures it’s a block-level element */
}

.ingredients li {
  display: block;        /* Ensures each list item is stacked vertically */
  margin-bottom: 10px;    /* Optional: Adds spacing between ingredients */
}

  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  ul, ol {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
  }
  
  .go-back-button {
    position: absolute; /* Position button absolutely */
    top: 20px;
    right: 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .go-back-button:hover {
    background-color: #45a049;
  }

  .bookmark-icon {
  font-size: 1.5rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.3s;
  margin-right: 10px;
}

.bookmark-icon.bi-bookmark-fill {
  color: #FFD700; /* Gold color for bookmarked */
}

.bookmark-icon:hover {
  color: #ff4500; /* Change color on hover for better feedback */
}

  </style>
  