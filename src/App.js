import './App.css';
import { useState } from 'react';

function Nav() {
  return (<div className='nav'>
    <h1>Recipe Book</h1>
  </div>)
}

function PostList(props) {
  return (<div className='post-list' onClick={() => props.onDetailHandeler(props.recipe)}> 
    <img src={props.recipe.imgUrl} width='300px'></img>
    <p>{props.recipe.title}</p>
  </div>)
}

function PostDetail(props) {
  return (<div className='post-detail'>
    <p>{props.recipe.title}</p>
    <img src={props.recipe.imgUrl} width='500px'></img>
    <ul>{props.recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
    <p>{props.recipe.body}</p>
  </div>)
}

function App() {
  const [recipes, setRecipes] = useState([{id: 1, title: 'Salmon Teriyaki', ingredients: ['salmon', 'teriyaki sauce', 'broccoli', 'oil', 'pepper'], body: 'Season the salmon with pepper then grill it. Once cooked, put some teriyaki sauce and water 2~4 tbsp. Boil down until the sauce well the salmon. Accompany with cooked broccli or some veggies.', imgUrl: 'https://culinaryginger.com/wp-content/uploads/Teriyaki-Glazed-Salmon-59-720x405.jpg'}, {id: 2, title: 'Bulgogi', ingredients: ['beef', 'onion', 'oil', 'pepper', 'soy sauce', 'sugar'], body: 'Marinate beef with soy sauce, pepper, sugar for 1 hour. Grill it with onion until it cooked.', imgUrl: 'https://www.koreanbapsang.com/wp-content/uploads/2019/04/DSC_0893-3-e1645068795695.jpg'}]);
  const [mode, setMode] = useState(null);
  const [detailRecipe, setDetailRecipe] = useState(null);

  return (
    <div className="App">
      <Nav></Nav>
      {mode === 'DETAIL' ? <>
        <a href='/'>Back</a>
        <PostDetail recipe={detailRecipe}></PostDetail>
      </> : <>
        {recipes.map(recipe => 
        <PostList key={recipe.id} recipe={recipe} onDetailHandeler={(detailRecipe) => {
          setDetailRecipe(detailRecipe);
          setMode('DETAIL')}}></PostList>)}</>}
    </div>
  );
}

export default App;
