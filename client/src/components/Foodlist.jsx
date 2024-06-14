import { useNavigate } from 'react-router-dom';
import '../styles/foodlist.css';

export default function FoodList({ userInput }) {
    const navigate = useNavigate();
    const handleKnowMoreClick = (id) => {
        navigate(`/fooddetails/${id}`);
    };
    return (
        <div className='single-recipe-container'>
            {userInput.map((recipe) => (
                <div className='single-recipe' key={recipe.id}>
                    <img src={recipe.image} alt={recipe.title} />
                    <p>{recipe.title}</p>
                    <button onClick={() => handleKnowMoreClick(recipe.id)}>Know more</button>
                </div>
            ))}
        </div>
    );
}