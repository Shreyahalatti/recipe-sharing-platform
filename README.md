# RECIPE SHARING PLATFORM

## Project Requirements
1. Build backend API for creating, browsing, searching recipes
2. Build frontend where users can post recipes with ingredients, steps, photos
3. Add user authentication - save favorite recipes to profile
4. Search and filtering by ingredient, cuisine, cook time
5. Store recipes, users, favorites in database
6. Bonus: Rating and review system

## Starter Data Model
- User: name, email, password hash
- Recipe: title, description, ingredients, steps, cuisine, cook time, photo, author
- Favorite: user and recipe references
- Review: user, recipe, rating, and comment

## API Routes
POST   /api/auth/register
POST   /api/auth/login
GET    /api/recipes
POST   /api/recipes
GET    /api/recipes/:id
PUT    /api/recipes/:id
DELETE /api/recipes/:id
POST   /api/recipes/:id/favorites
DELETE /api/recipes/:id/favorites
POST   /api/recipes/:id/reviews

Query Example: ?ingredient=tomato&cuisine=Italian&maxCookTime=30