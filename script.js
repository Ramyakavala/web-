async function searchRecipes() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.meals) {
      resultsDiv.innerHTML = "<p>No recipes found. Try something else.</p>";
      return;
    }

    data.meals.forEach(meal => {
      const recipeDiv = document.createElement("div");
      recipeDiv.className = "recipe";

      recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <a href="${meal.strSource || '#'}" target="_blank">View Recipe</a>
      `;

      resultsDiv.appendChild(recipeDiv);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    resultsDiv.innerHTML = "<p>Something went wrong. Please try again later.</p>";
  }
}
