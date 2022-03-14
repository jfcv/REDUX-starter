const recipe = {
  name: "Sphagetti Bolognese",
  ingredients: ["egg", "salt"],
};

/**
 * adding a new ingredient
 */
const added = { ...recipe, ingredients: [...recipe.ingredients, "cream"] };

console.log(recipe);
console.log(added);

/**
 * replacing an element
 */
const replaced = {
  ...recipe,
  ingredients: [
    ...recipe.ingredients.map((ingredient) =>
      ingredient === "egg" ? "egg white" : ingredient
    ),
  ],
};
console.log(recipe);
console.log(replaced);

/**
 * removing an ingredient
 */
const removed = {
  ...recipe,
  ingredients: [
    ...recipe.ingredients.filter((ingredient) => ingredient !== "egg"),
  ],
};
console.log(recipe);
console.log(removed);
