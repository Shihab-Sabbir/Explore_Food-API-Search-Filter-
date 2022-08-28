function isLoading(dataLoading) {
    const loading = document.getElementById('loading');
    if (dataLoading) { loading.classList.remove('d-none'); }
    else { loading.classList.add('d-none'); }
}
function isSearchData(searchValue) {
    const noData = document.getElementById('noData');
    const foodContainer = document.getElementById('food-container');
    if (searchValue) { noData.classList.add('d-none'); foodContainer.classList.remove('d-none'); }
    else { noData.classList.remove('d-none'); foodContainer.classList.add('d-none'); }
}

const mealDetailsByID = (id, foodContainer) => {
    let mealId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(mealId).then(res => res.json()).then(data => {
        const { strMealThumb, strMeal, strCategory, strArea, strYoutube } = data.meals[0];
        isLoading(false);
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
    isLoading(true);
    noData.classList.add('d-none');
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
    this.event.preventDefault();
    let searchData = document.getElementById('searchInput');
    const urlSearch = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData.value}`;
    fetch(urlSearch)
        .then(res => res.json())
        .then(data => { if (data.meals) { isLoading(true); isSearchData(true); loadMeals(data.meals) } else { isSearchData(false) }; })
        .catch(err => { console.log(err) });

}

function loadWindow() {
    location.reload();
    isLoading(true);
}

isLoading(true);