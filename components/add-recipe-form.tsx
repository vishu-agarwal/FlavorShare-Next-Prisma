"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Minus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Ingredient {
  name: string
  quantity: string
  unit: string
}

export function AddRecipeForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [prepTime, setPrepTime] = useState("")
  const [cookTime, setCookTime] = useState("")
  const [servings, setServings] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", quantity: "", unit: "" }])
  const [instructions, setInstructions] = useState<string[]>([""])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Available categories (in a real app, fetch from API)
  const categories = [
    { id: "breakfast", name: "Breakfast" },
    { id: "lunch", name: "Lunch" },
    { id: "dinner", name: "Dinner" },
    { id: "dessert", name: "Dessert" },
    { id: "vegetarian", name: "Vegetarian" },
  ]

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }])
  }

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index))
    }
  }

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const updated = ingredients.map((ingredient, i) => (i === index ? { ...ingredient, [field]: value } : ingredient))
    setIngredients(updated)
  }

  const addInstruction = () => {
    setInstructions([...instructions, ""])
  }

  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index))
    }
  }

  const updateInstruction = (index: number, value: string) => {
    const updated = instructions.map((instruction, i) => (i === index ? value : instruction))
    setInstructions(updated)
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create a sample user for now (in a real app, get from auth)
      const sampleUser = await fetch("/api/users/sample")
      const userData = await sampleUser.json()

      const recipeData = {
        title,
        description,
        prepTime: Number.parseInt(prepTime),
        cookTime: Number.parseInt(cookTime),
        servings: Number.parseInt(servings),
        difficulty: difficulty.toUpperCase(),
        ingredients: ingredients.filter((ing) => ing.name.trim()),
        instructions: instructions.filter((inst) => inst.trim()),
        categories: selectedCategories,
        authorId: userData.id,
      }

      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      })

      if (response.ok) {
        const recipe = await response.json()
        toast({
          title: "Recipe created!",
          description: "Your recipe has been shared successfully.",
        })
        router.push(`/recipes/${recipe.id}`)
      } else {
        throw new Error("Failed to create recipe")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create recipe. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4 sm:space-y-6">
        <div>
          <Label htmlFor="title" className="text-base">Recipe Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            className="h-12 mt-2"
            required
          />
        </div>
        <div>
          <Label htmlFor="description" className="text-base">Description *</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your recipe"
            className="mt-2 min-h-[100px]"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="prepTime" className="text-base">Prep Time (minutes) *</Label>
            <Input
              id="prepTime"
              type="number"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              placeholder="15"
              className="h-12 mt-2"
              required
            />
          </div>
          <div>
            <Label htmlFor="cookTime" className="text-base">Cook Time (minutes) *</Label>
            <Input
              id="cookTime"
              type="number"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              placeholder="30"
              className="h-12 mt-2"
              required
            />
          </div>
          <div>
            <Label htmlFor="servings" className="text-base">Servings *</Label>
            <Input
              id="servings"
              type="number"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              placeholder="4"
              className="h-12 mt-2"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="difficulty" className="text-base">Difficulty *</Label>
          <Select value={difficulty} onValueChange={setDifficulty} required>
            <SelectTrigger className="h-12 mt-2">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Categories */}
      <div>
        <Label className="text-base">Categories</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-3">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <Label htmlFor={category.id} className="text-sm sm:text-base">{category.name}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Label className="text-base">Ingredients *</Label>
          <Button type="button" onClick={addIngredient} size="sm" variant="outline" className="h-10">
            <Plus className="h-4 w-4 mr-2" />
            Add Ingredient
          </Button>
        </div>
        <div className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
              <div className="sm:col-span-5">
                <Input
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(index, "name", e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <div className="sm:col-span-3">
                <Input
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => updateIngredient(index, "quantity", e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <div className="sm:col-span-3">
                <Input
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(index, "unit", e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="sm:col-span-1">
                <Button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  size="sm"
                  variant="outline"
                  disabled={ingredients.length === 1}
                  className="h-12 w-full"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Label className="text-base">Instructions *</Label>
          <Button type="button" onClick={addInstruction} size="sm" variant="outline" className="h-10">
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </div>
        <div className="space-y-4">
          {instructions.map((instruction, index) => (
            <div key={index} className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-2">
                {index + 1}
              </div>
              <Textarea
                placeholder={`Step ${index + 1} instructions`}
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                className="flex-1 min-h-[80px]"
                required
              />
              <Button
                type="button"
                onClick={() => removeInstruction(index)}
                size="sm"
                variant="outline"
                disabled={instructions.length === 1}
                className="mt-2 h-10 w-10 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
        <Button type="button" variant="outline" onClick={() => router.back()} className="h-12">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700 h-12">
          {isSubmitting ? "Creating..." : "Share Recipe"}
        </Button>
      </div>
    </form>
  )
} 