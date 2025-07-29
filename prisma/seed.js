const { PrismaClient, Difficulty } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "breakfast" },
      update: {},
      create: { name: "Breakfast", slug: "breakfast" },
    }),
    prisma.category.upsert({
      where: { slug: "lunch" },
      update: {},
      create: { name: "Lunch", slug: "lunch" },
    }),
    prisma.category.upsert({
      where: { slug: "dinner" },
      update: {},
      create: { name: "Dinner", slug: "dinner" },
    }),
    prisma.category.upsert({
      where: { slug: "dessert" },
      update: {},
      create: { name: "Dessert", slug: "dessert" },
    }),
    prisma.category.upsert({
      where: { slug: "vegetarian" },
      update: {},
      create: { name: "Vegetarian", slug: "vegetarian" },
    }),
    prisma.category.upsert({
      where: { slug: "vegan" },
      update: {},
      create: { name: "Vegan", slug: "vegan" },
    }),
    prisma.category.upsert({
      where: { slug: "gluten-free" },
      update: {},
      create: { name: "Gluten-Free", slug: "gluten-free" },
    }),
    prisma.category.upsert({
      where: { slug: "quick-meals" },
      update: {},
      create: { name: "Quick Meals", slug: "quick-meals" },
    }),
    prisma.category.upsert({
      where: { slug: "slow-cooker" },
      update: {},
      create: { name: "Slow Cooker", slug: "slow-cooker" },
    }),
    prisma.category.upsert({
      where: { slug: "baking" },
      update: {},
      create: { name: "Baking", slug: "baking" },
    }),
  ]);

  // Create ingredients
  const ingredients = await Promise.all([
    prisma.ingredient.upsert({
      where: { name: "Eggs" },
      update: {},
      create: { name: "Eggs" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Flour" },
      update: {},
      create: { name: "Flour" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Milk" },
      update: {},
      create: { name: "Milk" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Sugar" },
      update: {},
      create: { name: "Sugar" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Butter" },
      update: {},
      create: { name: "Butter" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Chicken Breast" },
      update: {},
      create: { name: "Chicken Breast" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Rice" },
      update: {},
      create: { name: "Rice" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Tomatoes" },
      update: {},
      create: { name: "Tomatoes" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Onions" },
      update: {},
      create: { name: "Onions" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Garlic" },
      update: {},
      create: { name: "Garlic" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Olive Oil" },
      update: {},
      create: { name: "Olive Oil" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Cheese" },
      update: {},
      create: { name: "Cheese" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Spinach" },
      update: {},
      create: { name: "Spinach" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Mushrooms" },
      update: {},
      create: { name: "Mushrooms" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Chocolate" },
      update: {},
      create: { name: "Chocolate" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Vanilla Extract" },
      update: {},
      create: { name: "Vanilla Extract" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Baking Powder" },
      update: {},
      create: { name: "Baking Powder" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Salt" },
      update: {},
      create: { name: "Salt" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Bananas" },
      update: {},
      create: { name: "Bananas" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Almond Flour" },
      update: {},
      create: { name: "Almond Flour" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Beef Chuck" },
      update: {},
      create: { name: "Beef Chuck" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Carrots" },
      update: {},
      create: { name: "Carrots" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Black Pepper" },
      update: {},
      create: { name: "Black Pepper" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Lemon" },
      update: {},
      create: { name: "Lemon" },
    }),
  ]);

  // Create users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "chef@flavorshare.com" },
      update: {},
      create: {
        email: "chef@flavorshare.com",
        name: "Chef Maria",
        bio: "Passionate home cook sharing family recipes",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.upsert({
      where: { email: "baker@flavorshare.com" },
      update: {},
      create: {
        email: "baker@flavorshare.com",
        name: "Baker John",
        bio: "Professional pastry chef with a sweet tooth",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.upsert({
      where: { email: "vegan@flavorshare.com" },
      update: {},
      create: {
        email: "vegan@flavorshare.com",
        name: "Vegan Sarah",
        bio: "Plant-based cooking enthusiast",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.upsert({
      where: { email: "quick@flavorshare.com" },
      update: {},
      create: {
        email: "quick@flavorshare.com",
        name: "Quick Cook Mike",
        bio: "30-minute meals for busy professionals",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
    }),
  ]);

  // Create recipes
  const recipes = await Promise.all([
    // Classic Pancakes
    prisma.recipe.create({
      data: {
        title: "Classic Pancakes",
        description:
          "Fluffy and delicious pancakes perfect for weekend mornings",
        prepTime: 10,
        cookTime: 15,
        servings: 4,
        difficulty: Difficulty.EASY,
        instructions: [
          "Mix dry ingredients in a large bowl",
          "Whisk wet ingredients in another bowl",
          "Combine wet and dry ingredients until just mixed",
          "Heat pan over medium heat",
          "Pour batter and cook until bubbles form",
          "Flip and cook until golden brown",
        ],
        authorId: users[0].id,
        ingredients: {
          create: [
            {
              quantity: "2",
              unit: "cups",
              ingredient: { connect: { name: "Flour" } },
            },
            {
              quantity: "2",
              unit: "large",
              ingredient: { connect: { name: "Eggs" } },
            },
            {
              quantity: "1.5",
              unit: "cups",
              ingredient: { connect: { name: "Milk" } },
            },
            {
              quantity: "2",
              unit: "tbsp",
              ingredient: { connect: { name: "Sugar" } },
            },
            {
              quantity: "1",
              unit: "tsp",
              ingredient: { connect: { name: "Baking Powder" } },
            },
            {
              quantity: "1/2",
              unit: "tsp",
              ingredient: { connect: { name: "Salt" } },
            },
          ],
        },
        categories: {
          create: [
            { category: { connect: { slug: "breakfast" } } },
            { category: { connect: { slug: "vegetarian" } } },
          ],
        },
      },
    }),

    // Chocolate Chip Cookies
    prisma.recipe.create({
      data: {
        title: "Chocolate Chip Cookies",
        description: "Soft and chewy cookies with chocolate chips",
        prepTime: 15,
        cookTime: 12,
        servings: 24,
        difficulty: Difficulty.EASY,
        instructions: [
          "Preheat oven to 375°F (190°C)",
          "Cream butter and sugar until fluffy",
          "Beat in eggs and vanilla",
          "Mix in dry ingredients",
          "Stir in chocolate chips",
          "Drop rounded tablespoons onto baking sheet",
          "Bake for 10-12 minutes until golden",
        ],
        authorId: users[1].id,
        ingredients: {
          create: [
            {
              quantity: "2.25",
              unit: "cups",
              ingredient: { connect: { name: "Flour" } },
            },
            {
              quantity: "1",
              unit: "cup",
              ingredient: { connect: { name: "Butter" } },
            },
            {
              quantity: "3/4",
              unit: "cup",
              ingredient: { connect: { name: "Sugar" } },
            },
            {
              quantity: "2",
              unit: "large",
              ingredient: { connect: { name: "Eggs" } },
            },
            {
              quantity: "1",
              unit: "tsp",
              ingredient: { connect: { name: "Vanilla Extract" } },
            },
            {
              quantity: "2",
              unit: "cups",
              ingredient: { connect: { name: "Chocolate" } },
            },
          ],
        },
        categories: {
          create: [
            { category: { connect: { slug: "dessert" } } },
            { category: { connect: { slug: "baking" } } },
          ],
        },
      },
    }),

    // Vegan Buddha Bowl
    prisma.recipe.create({
      data: {
        title: "Vegan Buddha Bowl",
        description: "Nutritious and colorful plant-based bowl",
        prepTime: 20,
        cookTime: 25,
        servings: 2,
        difficulty: Difficulty.MEDIUM,
        instructions: [
          "Cook rice according to package instructions",
          "Sauté mushrooms and garlic in olive oil",
          "Steam spinach until wilted",
          "Slice tomatoes and onions",
          "Arrange all ingredients in bowls",
          "Drizzle with olive oil and lemon juice",
        ],
        authorId: users[2].id,
        ingredients: {
          create: [
            {
              quantity: "1",
              unit: "cup",
              ingredient: { connect: { name: "Rice" } },
            },
            {
              quantity: "2",
              unit: "cups",
              ingredient: { connect: { name: "Spinach" } },
            },
            {
              quantity: "1",
              unit: "cup",
              ingredient: { connect: { name: "Mushrooms" } },
            },
            {
              quantity: "2",
              unit: "medium",
              ingredient: { connect: { name: "Tomatoes" } },
            },
            {
              quantity: "1",
              unit: "medium",
              ingredient: { connect: { name: "Onions" } },
            },
            {
              quantity: "3",
              unit: "cloves",
              ingredient: { connect: { name: "Garlic" } },
            },
            {
              quantity: "2",
              unit: "tbsp",
              ingredient: { connect: { name: "Olive Oil" } },
            },
            {
              quantity: "1",
              unit: "medium",
              ingredient: { connect: { name: "Lemon" } },
            },
          ],
        },
        categories: {
          create: [
            { category: { connect: { slug: "lunch" } } },
            { category: { connect: { slug: "vegan" } } },
            { category: { connect: { slug: "vegetarian" } } },
          ],
        },
      },
    }),

    // Quick Chicken Stir Fry
    prisma.recipe.create({
      data: {
        title: "Quick Chicken Stir Fry",
        description: "Fast and flavorful chicken stir fry with vegetables",
        prepTime: 15,
        cookTime: 15,
        servings: 4,
        difficulty: Difficulty.EASY,
        instructions: [
          "Slice chicken into thin strips",
          "Heat oil in large wok or pan",
          "Stir fry chicken until golden",
          "Add vegetables and stir fry",
          "Season with salt and pepper",
          "Serve over rice",
        ],
        authorId: users[3].id,
        ingredients: {
          create: [
            {
              quantity: "1",
              unit: "lb",
              ingredient: { connect: { name: "Chicken Breast" } },
            },
            {
              quantity: "2",
              unit: "cups",
              ingredient: { connect: { name: "Rice" } },
            },
            {
              quantity: "2",
              unit: "medium",
              ingredient: { connect: { name: "Onions" } },
            },
            {
              quantity: "3",
              unit: "cloves",
              ingredient: { connect: { name: "Garlic" } },
            },
            {
              quantity: "2",
              unit: "tbsp",
              ingredient: { connect: { name: "Olive Oil" } },
            },
            {
              quantity: "1",
              unit: "tsp",
              ingredient: { connect: { name: "Salt" } },
            },
            {
              quantity: "1/2",
              unit: "tsp",
              ingredient: { connect: { name: "Black Pepper" } },
            },
          ],
        },
        categories: {
          create: [
            { category: { connect: { slug: "dinner" } } },
            { category: { connect: { slug: "quick-meals" } } },
          ],
        },
      },
    }),

    // Slow Cooker Beef Stew
    prisma.recipe.create({
      data: {
        title: "Slow Cooker Beef Stew",
        description: "Hearty beef stew that cooks all day",
        prepTime: 20,
        cookTime: 480,
        servings: 6,
        difficulty: Difficulty.MEDIUM,
        instructions: [
          "Brown beef in batches",
          "Layer vegetables in slow cooker",
          "Add beef and seasonings",
          "Pour in broth",
          "Cook on low for 8 hours",
          "Serve hot with bread",
        ],
        authorId: users[0].id,
        ingredients: {
          create: [
            {
              quantity: "2",
              unit: "lbs",
              ingredient: { connect: { name: "Beef Chuck" } },
            },
            {
              quantity: "4",
              unit: "medium",
              ingredient: { connect: { name: "Onions" } },
            },
            {
              quantity: "6",
              unit: "medium",
              ingredient: { connect: { name: "Carrots" } },
            },
            {
              quantity: "4",
              unit: "cloves",
              ingredient: { connect: { name: "Garlic" } },
            },
            {
              quantity: "2",
              unit: "tbsp",
              ingredient: { connect: { name: "Olive Oil" } },
            },
            {
              quantity: "1",
              unit: "tsp",
              ingredient: { connect: { name: "Salt" } },
            },
            {
              quantity: "1",
              unit: "tsp",
              ingredient: { connect: { name: "Black Pepper" } },
            },
          ],
        },
        categories: {
          create: [
            { category: { connect: { slug: "dinner" } } },
            { category: { connect: { slug: "slow-cooker" } } },
          ],
        },
      },
    }),

    // Gluten-Free Banana Bread
    prisma.recipe.create({
      data: {
        title: "Gluten-Free Banana Bread",
        description: "Moist and delicious gluten-free banana bread",
        prepTime: 15,
        cookTime: 60,
        servings: 8,
        difficulty: Difficulty.MEDIUM,
        instructions: [
          "Preheat oven to 350°F (175°C)",
          "Mash ripe bananas",
          "Mix wet ingredients",
          "Combine with dry ingredients",
          "Pour into greased loaf pan",
          "Bake for 55-60 minutes",
        ],
        authorId: users[1].id,
        ingredients: {
          create: [
            {
              quantity: "3",
              unit: "large",
              ingredient: { connect: { name: "Bananas" } },
            },
            {
              quantity: "2",
              unit: "large",
              ingredient: { connect: { name: "Eggs" } },
            },
            {
              quantity: "1/3",
              unit: "cup",
              ingredient: { connect: { name: "Butter" } },
            },
            {
              quantity: "1",
              unit: "cup",
              ingredient: { connect: { name: "Almond Flour" } },
            },
            {
              quantity: "1/2",
              unit: "cup",
              ingredient: { connect: { name: "Sugar" } },
            },
            {
              quantity: "1",
              unit: "tsp",
              ingredient: { connect: { name: "Vanilla Extract" } },
            },
          ],
        },
        categories: {
          create: [
            { category: { connect: { slug: "baking" } } },
            { category: { connect: { slug: "gluten-free" } } },
          ],
        },
      },
    }),
  ]);

  // Additional ingredients are now created in the initial ingredients section

  // Create ratings
  const ratings = await Promise.all([
    prisma.rating.create({
      data: {
        value: 5,
        userId: users[1].id,
        recipeId: recipes[0].id, // Pancakes
      },
    }),
    prisma.rating.create({
      data: {
        value: 4,
        userId: users[2].id,
        recipeId: recipes[0].id, // Pancakes
      },
    }),
    prisma.rating.create({
      data: {
        value: 5,
        userId: users[0].id,
        recipeId: recipes[1].id, // Cookies
      },
    }),
    prisma.rating.create({
      data: {
        value: 4,
        userId: users[3].id,
        recipeId: recipes[2].id, // Buddha Bowl
      },
    }),
    prisma.rating.create({
      data: {
        value: 5,
        userId: users[1].id,
        recipeId: recipes[2].id, // Buddha Bowl
      },
    }),
    prisma.rating.create({
      data: {
        value: 3,
        userId: users[2].id,
        recipeId: recipes[3].id, // Stir Fry
      },
    }),
    prisma.rating.create({
      data: {
        value: 5,
        userId: users[0].id,
        recipeId: recipes[4].id, // Beef Stew
      },
    }),
    prisma.rating.create({
      data: {
        value: 4,
        userId: users[3].id,
        recipeId: recipes[5].id, // Banana Bread
      },
    }),
  ]);

  // Create comments
  const comments = await Promise.all([
    prisma.comment.create({
      data: {
        content: "These pancakes are absolutely perfect! My kids love them.",
        userId: users[1].id,
        recipeId: recipes[0].id, // Pancakes
      },
    }),
    prisma.comment.create({
      data: {
        content: "Great recipe! I added blueberries and they were delicious.",
        userId: users[2].id,
        recipeId: recipes[0].id, // Pancakes
      },
    }),
    prisma.comment.create({
      data: {
        content: "Best chocolate chip cookies I've ever made!",
        userId: users[0].id,
        recipeId: recipes[1].id, // Cookies
      },
    }),
    prisma.comment.create({
      data: {
        content: "This Buddha bowl is so nutritious and filling!",
        userId: users[1].id,
        recipeId: recipes[2].id, // Buddha Bowl
      },
    }),
    prisma.comment.create({
      data: {
        content: "Perfect for meal prep! I made a big batch for the week.",
        userId: users[3].id,
        recipeId: recipes[2].id, // Buddha Bowl
      },
    }),
    prisma.comment.create({
      data: {
        content:
          "Quick and easy dinner! I added some soy sauce for extra flavor.",
        userId: users[2].id,
        recipeId: recipes[3].id, // Stir Fry
      },
    }),
    prisma.comment.create({
      data: {
        content:
          "The slow cooker makes this so convenient. Perfect comfort food!",
        userId: users[0].id,
        recipeId: recipes[4].id, // Beef Stew
      },
    }),
    prisma.comment.create({
      data: {
        content: "Great gluten-free option! My celiac friend loved it.",
        userId: users[3].id,
        recipeId: recipes[5].id, // Banana Bread
      },
    }),
  ]);

  console.log("Database seeded successfully!");
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${ingredients.length} ingredients`);
  console.log(`Created ${users.length} users`);
  console.log(`Created ${recipes.length} recipes`);
  console.log(`Created ${ratings.length} ratings`);
  console.log(`Created ${comments.length} comments`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
