const mealDetailsByID = (id, foodContainer) => {
    let mealId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(mealId).then(res => res.json()).then(data => {
        const { strMealThumb, strMeal, strCategory, strArea, strYoutube } = data.meals[0];

        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `<div class="card">
    <img src="${strMealThumb}" class="card-img-top">
    <div class="card-body text-center">
        <div style='min-height:100px'>
            <h5 class="card-title fw-bolder text-warning">${strMeal}</h5>
            <p class="card-text fw-bold text-primary d-inline">Category: ${strCategory}</p>
            <p class="card-text fw-bold text-primary d-inline">| Origin: ${strArea}</p>
        </div>
        <hr />
        <button class='btn btn-primary bg-white text-primary border-primary' onclick="modalBtn('${id}')" >Details</button>
    </div>
</div>
    `;
        foodContainer.appendChild(mealDiv);
    });
}

const loadMeals = (meals) => {
    const foodContainer = document.getElementById('food-container');
    foodContainer.innerHTML = '';
    for (const meal of meals) {
        mealDetailsByID(meal.idMeal, foodContainer);
    }
}

const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
fetch(url)
    .then(res => res.json())
    .then(data => { loadMeals(data.meals) })
    .catch(err => { console.log(err) });


function search() {
    let searchData = document.getElementById('searchInput');
    const urlSearch = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData.value}`;
    fetch(urlSearch)
        .then(res => res.json())
        .then(data => { console.log(data); loadMeals(data.meals, searchData) })
        .catch(err => { console.log(err) });

}

// function loadWindow() {
//     location.reload();
// } nn