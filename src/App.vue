<template>
  <div id="app">
    <!-- Top Navigation Bar -->
    <nav>
      <ul>
        <li><router-link to="/" exact-active-class="active-link">Home</router-link></li>
        <li><router-link to="/recipe" exact-active-class="active-link">All Recipes</router-link></li>
      </ul>
    </nav>

    <!-- Main content area rendered by router-view -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

/* Styling the navigation bar */
nav {
  background-color: lightgray;
  padding: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

li {
  margin-right: 20px;
}

router-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

router-link:hover {
  text-decoration: underline;
}

/* Add your custom active class styling */
.active-link {
  color: #FFD700;
  /* Change to any color you prefer */
}
</style>
