import './App.css';
import { useState } from 'react';

function Nav() {
  return (<div className='nav'>
    <h1>Recipe Book</h1>
  </div>)
}

function PostList(props) {
  return (<div className='post-list' onClick={() => props.onDetailHandeler(props.recipe)}>
    <img src={props.recipe.imgUrl} width='300px' alt={props.recipe.title}></img>
    <p>{props.recipe.title}</p>
  </div>)
}

function PostDetail(props) {
  return (<div className='post-detail'>
    <p>{props.recipe.title}</p>
    <img src={props.recipe.imgUrl} width='500px' alt={props.recipe.title}></img>
    <ul>{props.recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
    <p>{props.recipe.body}</p>
  </div>)
}

function Create(props) {
  const [title, setTitle] = useState();
  const [ingredients, setIngredients] = useState();
  const [body, setBody] = useState();
  const [imgUrl, setImgUrl] = useState();

  return (<div className='create-post'>
    <form className='create-form' onSubmit={(e) => {
      e.preventDefault();
      props.onCreate(title, ingredients, body, imgUrl)}}>
      <input type="text" name="title" placeholder='what do you make' required onChange={(e)=>setTitle(e.target.value)}></input>
      <input type="text" name="ingredients" placeholder='what do you need' required onChange={(e)=>setIngredients(e.target.value)}></input>
      <textarea type="text" name="body" placeholder='how do you make' required onChange={(e)=>setBody(e.target.value)}></textarea>
      <input type="url" name="imgUrl" placeholder='image url' onChange={(e)=>setImgUrl(e.target.value)}></input>
      <input type="submit"></input>
    </form>
  </div>)
}

function App() {
  const [recipes, setRecipes] = useState([{ id: 1, title: 'Salmon Teriyaki', ingredients: ['salmon', 'teriyaki sauce', 'broccoli', 'oil', 'pepper'], body: 'Season the salmon with pepper then grill it. Once cooked, put some teriyaki sauce and water 2~4 tbsp. Boil down until the sauce well the salmon. Accompany with cooked broccli or some veggies.', imgUrl: 'https://culinaryginger.com/wp-content/uploads/Teriyaki-Glazed-Salmon-59-720x405.jpg' }, { id: 2, title: 'Bulgogi', ingredients: ['beef', 'onion', 'oil', 'pepper', 'soy sauce', 'sugar'], body: 'Marinate beef with soy sauce, pepper, sugar for 1 hour. Grill it with onion until it cooked.', imgUrl: 'https://www.koreanbapsang.com/wp-content/uploads/2019/04/DSC_0893-3-e1645068795695.jpg' }]);
  const [mode, setMode] = useState(null);
  const [detailRecipe, setDetailRecipe] = useState(null);
  const [nextId, setNextId] = useState(3);
  console.log(recipes);
  return (
    <div className="App">
      <Nav></Nav>

      {(mode === 'CREATE') ?
        <>
          <a href='/'>Back</a>
          <Create onCreate={(_title, _ingredients, _body, _imgUrl) => {
            const newRecipes = [...recipes];
            const ingredients = _ingredients.split(',');
            const newRecie = {id: nextId, title: _title, ingredients: ingredients, body: _body, imgUrl: _imgUrl};
            newRecipes.push(newRecie);
            setRecipes(newRecipes); 
            setNextId(nextId+1);
            setMode(null);
          }}></Create>
        </>
        : (mode === 'DETAIL') ? <>
          <a href='/'>Back</a>
          <PostDetail recipe={detailRecipe}></PostDetail>
        </>
          : <>
            <button onClick={() => setMode('CREATE')}>Add a new recipi</button>
            {recipes.map(recipe =>
              <PostList
                key={recipe.id}
                recipe={recipe}
                onDetailHandeler={(detailRecipe) => {
                  setDetailRecipe(detailRecipe);
                  setMode('DETAIL')
                }}></PostList>)}
          </>
      }
    </div>
  );
}

export default App;
