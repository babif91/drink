const cocktails = [
  { name: "Suntory Hiball", attributes: ["bubbly", "japanese"] },
  { name: "Gin Tonic", attributes: ["bubbly", "sour"] },
  { name: "Gin Buck", attributes: ["bubbly", "sweet"] },
  { name: "Vodka Tonic", attributes: ["bubbly", "sour"] },
  { name: "Moscow Mule", attributes: ["bubbly", "sweet"] },
  { name: "Screw Driver", attributes: ["sweet", "juicy"] },
  { name: "Rum Coke", attributes: ["bubbly", "sweet"] },
  { name: "Campari Soda", attributes: ["bubbly", "sweet"] },
  { name: "Stones Buck", attributes: ["bubbly", "sweet"] },
  { name: "Cassis Orange", attributes: ["sweet", "juicy"] },
  { name: "Yogurt Pine", attributes: ["sweet", "juicy"] },
  { name: "Tequila Sunrise", attributes: ["sweet", "juicy"] },
  { name: "Peach Fizz", attributes: ["bubbly", "sweet"] },
  { name: "Fazzy Navel", attributes: ["sweet", "juicy"] },
  { name: "Malibu Coke", attributes: ["bubbly", "sweet"] },
  { name: "J.J.", attributes: ["japanese"] },
  { name: "Baileys Milk", attributes: ["sweet"] },
  { name: "Kahlua Milk", attributes: ["sweet"] },
  { name: "Matcha Milk", attributes: ["sweet", "japanese"] },
  { name: "Sakura Fizz", attributes: ["sweet", "japanese", "bubbly"] },
  { name: "White Peach Fizz", attributes: ["sweet", "japanese", "bubbly"] },
  { name: "Salty Dog", attributes: ["sour", "juicy", "strong"] },
  { name: "China Blue", attributes: ["sweet", "juicy"] },
  { name: "Melon Soda", attributes: ["sweet", "bubbly"] },
  { name: "Cointreau Tonic", attributes: ["bubbly", "sweet"] },
  { name: "Kamikaze", attributes: ["strong", "japanese"] },
  { name: "Margarita", attributes: ["strong"] },
  { name: "Martini", attributes: ["strong", "sour"] },
  { name: "Long Island Ice Tea", attributes: ["strong"] },
  { name: "Godiva Milk", attributes: ["sweet"] },
  { name: "Umeshu", attributes: ["sweet", "japanese"] },
  { name: "Umeshu Soda", attributes: ["sweet", "japanese", "bubbly"] },
  { name: "Lemon CHUHI", attributes: ["bubbly", "japanese"] },
  { name: "Mango CHUHI", attributes: ["sweet", "bubbly", "juicy", "japanese"] },
  { name: "Cranberry CHUHI", attributes: ["sweet", "bubbly", "juicy", "japanese"] },
  { name: "Pineapple CHUHI", attributes: ["sweet", "bubbly", "juicy", "japanese"] },
  { name: "Vodka RedBull", attributes: ["strong", "sweet"] },
];

// Get references to DOM elements
const generateBtn = document.getElementById("generateBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const cocktailResult = document.getElementById("cocktailResult");
const attributeCheckboxes = document.getElementById("attributeCheckboxes");
const checkboxes = document.querySelectorAll("#attributeCheckboxes input[type='checkbox']");

// Function to get random cocktail based on selected attributes
function getRandomCocktail(selectedAttributes) {
  const filteredCocktails = cocktails.filter(cocktail => 
    selectedAttributes.every(attr => cocktail.attributes.includes(attr))
  );
  if (filteredCocktails.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * filteredCocktails.length);
  return filteredCocktails[randomIndex].name;
}

// Play sound on generate
function playButtonClickSound() {
  const audio = new Audio('icewater.mp3');
  audio.play();
}

// Generate button click handler
generateBtn.addEventListener("click", () => {
  const selectedAttributes = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const randomCocktail = getRandomCocktail(selectedAttributes);

  if (randomCocktail) {
    cocktailResult.textContent = randomCocktail;
  } else {
    cocktailResult.innerHTML = "Oops!<br>No match found..<br>Try different flavors!";
  }

  playButtonClickSound();

  // Hide flavor options & generate button
  attributeCheckboxes.style.display = "none";
  generateBtn.style.display = "none";

  // Show restart button
  tryAgainBtn.style.display = "block";
});

// Try again button click handler
tryAgainBtn.addEventListener("click", () => {
  cocktailResult.textContent = "";
  attributeCheckboxes.style.display = "block"; // Show options again
  generateBtn.style.display = "inline-block";         // Show generate button again
  tryAgainBtn.style.display = "none";          // Hide restart button

  // Reset all checkboxes
  checkboxes.forEach(cb => cb.checked = false);
});
