import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/fooddetails.css'
export default function Fooddetails() {
  const [foodDetails,setFoodDetails] = useState({})
  const params = useParams();
  const foodId = params.foodId;
  console.log(foodId)
  useEffect(() => {
    async function getFullDetails(){
      const API_KEY = 'd99f1a4712a34c33a98ec022c17596a6'
      const callAPI = await fetch(`https://api.spoonacular.com/recipes/${foodId}/information?apiKey=${API_KEY}`)
      const response = await callAPI.json();
      console.log(response)
      setFoodDetails(response)
    }
    getFullDetails()
  },[foodId])
  return (
    <div className='fooddetails-container'>
      <h1>Food Details</h1><hr />
      {
        <div className='fulldetails-container'>
           <img src={foodDetails.image} alt="" />
           <p>Name : {foodDetails.title}</p>
           <p>Price : {foodDetails.pricePerServing}</p>
           <p>Time Required to Cook : ⌚{foodDetails.readyInMinutes} Minutes</p>
           <p className='ingredients-text'>Ingredients :</p>
           {foodDetails.extendedIngredients?.map((ingredient, index) => (
                            <ul className='ingredients' key={index}>
                                <li >{ingredient.name}</li>
                            </ul>
                        ))}
           <p className='instructions'>Instructions : </p>
           <div className='instructions-container'>         
             {
              foodDetails.analyzedInstructions && foodDetails.analyzedInstructions.length > 0 ? 
              foodDetails.analyzedInstructions[0].steps.map((step) => {
                return <p>{step.number}.{step.step}</p>
              })
              : <p>No instructions available...</p>
             }
          </div>
        </div>
      }
    </div>
  )
}
