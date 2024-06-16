import React, { useState,useEffect } from 'react'
import Foodlist from './Foodlist';
import '../styles/body.css'
export default function () {
    const [recipe,setRecipe] = useState('pizza');
    const [userInput, setUserInput] = useState([]);
    useEffect(() => {
        async function getFood() {
            const URL = `https://api.spoonacular.com/recipes/complexSearch?query=${recipe}`;
            const API_KEY = "8f18e9e6b7044d06aa427e5f7018eda3";
            const fetchFood = await fetch(`${URL}&apiKey=${API_KEY}`);
            const res = await fetchFood.json();
            setUserInput(res.results);
        }
        getFood();
    }, [recipe]);
  return (
    <div className='body-container'>
        <input type="text" value={recipe} onChange={(e) => setRecipe(e.target.value)} autoFocus />
        <Foodlist userInput={userInput} />
    </div>
  )
}
