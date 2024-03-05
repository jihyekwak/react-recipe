import "./App.css"
import { useState } from "react"

function Nav() {
  return (
    <div className='nav'>
      <h1>Recipe Book</h1>
    </div>
  )
}

function PostList(props) {
  return (
    <div
      className='post-list'
      onClick={() => props.onDetailHandeler(props.recipe)}>
      <img
        src={props.recipe.imgUrl}
        width='300px'
        alt={props.recipe.title}></img>
      <p>{props.recipe.title}</p>
    </div>
  )
}

function PostDetail(props) {
  return (
    <div className='post-detail'>
      <p>{props.recipe.title}</p>
      <img
        src={props.recipe.imgUrl}
        width='500px'
        alt={props.recipe.title}></img>
      <ul>
        {props.recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>{props.recipe.body}</p>
    </div>
  )
}

function Create(props) {
  const [title, setTitle] = useState()
  const [ingredients, setIngredients] = useState()
  const [body, setBody] = useState()
  const [imgUrl, setImgUrl] = useState()

  return (
    <div className='create-post'>
      <form
        className='create-form'
        onSubmit={(e) => {
          e.preventDefault()
          props.onCreate(title, ingredients, body, imgUrl)
        }}>
        <input
          type='text'
          name='title'
          placeholder='what do you make'
          required
          onChange={(e) => setTitle(e.target.value)}></input>
        <input
          type='text'
          name='ingredients'
          placeholder='what do you need'
          required
          onChange={(e) => setIngredients(e.target.value)}></input>
        <textarea
          type='text'
          name='body'
          placeholder='how do you make'
          required
          onChange={(e) => setBody(e.target.value)}></textarea>
        <input
          type='url'
          name='imgUrl'
          placeholder='image url'
          onChange={(e) => setImgUrl(e.target.value)}></input>
        <input type='submit'></input>
      </form>
    </div>
  )
}

function Edit(props) {
  const [title, setTitle] = useState(props.recipe.title)
  const [ingredients, setIngredients] = useState(props.recipe.ingredients)
  const [body, setBody] = useState(props.recipe.body)
  const [imgUrl, setImgUrl] = useState(props.recipe.imgUrl)

  return (
    <div className='edit-post'>
      <form
        className='create-form'
        onSubmit={(e) => {
          e.preventDefault()
          props.onEdit(title, ingredients, body, imgUrl)
        }}>
        <input
          type='text'
          name='title'
          placeholder='what do you make'
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}></input>
        <input
          type='text'
          name='ingredients'
          placeholder='what do you need'
          value={ingredients}
          required
          onChange={(e) => setIngredients(e.target.value)}></input>
        <textarea
          type='text'
          name='body'
          placeholder='how do you make'
          value={body}
          required
          onChange={(e) => setBody(e.target.value)}></textarea>
        <input
          type='url'
          name='imgUrl'
          placeholder='image url'
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}></input>
        <input type='submit'></input>
      </form>
    </div>
  )
}

function App() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Salmon Teriyaki",
      ingredients: ["salmon", "teriyaki sauce", "broccoli", "oil", "pepper"],
      body: "Season the salmon with pepper then grill it. Once cooked, put some teriyaki sauce and water 2~4 tbsp. Boil down until the sauce well the salmon. Accompany with cooked broccli or some veggies.",
      imgUrl:
        "https://culinaryginger.com/wp-content/uploads/Teriyaki-Glazed-Salmon-59-720x405.jpg",
    },
    {
      id: 2,
      title: "Bulgogi",
      ingredients: ["beef", "onion", "oil", "pepper", "soy sauce", "sugar"],
      body: "Marinate beef with soy sauce, pepper, sugar for 1 hour. Grill it with onion until it cooked.",
      imgUrl:
        "https://www.koreanbapsang.com/wp-content/uploads/2019/04/DSC_0893-3-e1645068795695.jpg",
    },
  ])
  const [mode, setMode] = useState(null)
  const [detailRecipe, setDetailRecipe] = useState(null)
  const [nextId, setNextId] = useState(3)

  return (
    <div className='App'>
      <Nav></Nav>

      {mode === "CREATE" ? (
        <>
          <button onClick={() => setMode(null)}>Back</button>
          <Create
            onCreate={(_title, _ingredients, _body, _imgUrl) => {
              const newRecipes = [...recipes]
              const ingredients = _ingredients.split(",")
              const newRecipe = {
                id: nextId,
                title: _title,
                ingredients: ingredients,
                body: _body,
                imgUrl: _imgUrl,
              }
              newRecipes.push(newRecipe)
              setRecipes(newRecipes)
              setNextId(nextId + 1)
              setMode(null)
            }}></Create>
        </>
      ) : mode === "DETAIL" ? (
        <>
          <button onClick={() => setMode(null)}>Back</button>
          <PostDetail recipe={detailRecipe}></PostDetail>
          <button onClick={() => setMode("EDIT")}>Edit</button>
          <button
            onClick={() => {
              const newRecipes = recipes.filter(
                (recipe) => recipe.id !== detailRecipe.id
              )
              setRecipes(newRecipes)
              setMode(null)
            }}>
            Delete
          </button>
        </>
      ) : mode === "EDIT" ? (
        <>
          <button onClick={() => setMode("DETAIL")}>Back</button>
          <Edit
            recipe={detailRecipe}
            onEdit={(_title, _ingredients, _body, _imgUrl) => {
              const editedIngredients = _ingredients.split(",")
              const editedRecipe = Object.assign({
                detailRecipe,
                title: _title,
                ingredients: editedIngredients,
                body: _body,
                imgUrl: _imgUrl,
              })
              const newRecipes = recipes.map((recipe) =>
                recipe === detailRecipe ? editedRecipe : recipe
              )
              setRecipes(newRecipes)
              setDetailRecipe(editedRecipe)
              setMode("DETAIL")
            }}></Edit>
        </>
      ) : (
        <>
          <button onClick={() => setMode("CREATE")}>Add a new recipe</button>
          {recipes.map((recipe) => (
            <PostList
              key={recipe.id}
              recipe={recipe}
              onDetailHandeler={(detailRecipe) => {
                setDetailRecipe(detailRecipe)
                setMode("DETAIL")
              }}></PostList>
          ))}
        </>
      )}
    </div>
  )
}

export default App
