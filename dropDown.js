const urlCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
fetch(urlCategory)
    .then(res => res.json())
    .then(data => { loadCategory(data.meals) })
    .catch(err => { console.log(err) })

const loadCategory = (categories) => {
    const ListContainer = document.getElementById('dropDown');
    for (const category of categories) {
        const lists = document.createElement('div');
        let listItem = category.strCategory;
        lists.innerHTML = `
        <li><a class="dropdown-item" onclick="searchByCatagory('${listItem}')">${listItem}</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
    `;
        ListContainer.appendChild(lists);
    }
}

const searchByCatagory = (selectCategory) => {
    console.log(selectCategory);
    const urlSearch = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectCategory}`;
    fetch(urlSearch)
        .then(res => res.json())
        .then(data => { loadMeals(data.meals) })
        .catch(err => { console.log(err) })
}