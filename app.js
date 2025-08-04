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

const generateBtn = document.getElementById("generateBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const cocktailResult = document.getElementById("cocktailResult");
const attributeCheckboxes = document.getElementById("attributeCheckboxes");
const checkboxes = document.querySelectorAll("#attributeCheckboxes input[type='checkbox']");
const instructions = document.getElementById("instructions"); // NEW

function getRandomCocktail(selectedAttributes) {
  const filteredCocktails = cocktails.filter(cocktail =>
    selectedAttributes.every(attr => cocktail.attributes.includes(attr))
  );
  if (filteredCocktails.length === 0) return null;
  return filteredCocktails[Math.floor(Math.random() * filteredCocktails.length)].name;
}

function playButtonClickSound() {
  const audio = new Audio('icewater.mp3');
  audio.play();
}

generateBtn.addEventListener("click", () => {
  const selectedAttributes = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const randomCocktail = getRandomCocktail(selectedAttributes);

  if (randomCocktail) {
    cocktailResult.innerHTML = "";

    // Create link for drink + hint
    const link = document.createElement('a');
    link.href = `https://www.google.com/search?q=${encodeURIComponent(randomCocktail)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.display = "inline-block";
    link.style.textDecoration = "none";
    link.style.textAlign = "center";
    link.style.color = "#000";

    const nameSpan = document.createElement('span');
    nameSpan.textContent = randomCocktail;
    nameSpan.style.display = "block";
    nameSpan.style.fontWeight = "bold";
    nameSpan.style.fontSize = "1.2em";
    link.appendChild(nameSpan);

    const hint = document.createElement('small');
    hint.textContent = "🔍 Tap to search";
    hint.style.display = "block";
    hint.style.marginTop = "6px";
    hint.style.fontSize = "0.6em";
    hint.style.color = "#585858";
    link.appendChild(hint);

    cocktailResult.appendChild(link);
  } else {
    cocktailResult.innerHTML = "Oops!<br>No match found..<br>Try different flavors!";
  }

  playButtonClickSound();

  // Hide instructions, flavors, and generate button
  instructions.style.display = "none";
  attributeCheckboxes.style.display = "none";
  generateBtn.style.display = "none";

  // Show restart button
  tryAgainBtn.style.display = "block";
});

tryAgainBtn.addEventListener("click", () => {
  cocktailResult.textContent = "";
  attributeCheckboxes.style.display = "block";
  generateBtn.style.display = "inline-block";
  tryAgainBtn.style.display = "none";
  instructions.style.display = "block"; // Show again

  checkboxes.forEach(cb => cb.checked = false);
});