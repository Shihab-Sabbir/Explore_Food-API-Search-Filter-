// Get the modal
var modal = document.getElementById("myModal");

// When the user clicks the button, open the modal 
function modalBtn(id) {
    let mealId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(mealId).then(res => res.json()).then(data => {
        const { strInstructions, strMealThumb, strMeal, strYoutube } = data.meals[0];
        let link = strYoutube.slice(32, strYoutube.length);
        let urlLink = `https://www.youtube.com/embed/${link}`;
        modal.innerHTML = `
    <div class="modal-dialog bg-light p-2 modal-content">
             <img src="${strMealThumb}" class="card-img-top modalImage">
                <div class="card-body text-center modalBody">
                    <div>
                        <h5 class="card-title fw-bolder text-warning">${strMeal}</h5>
                        <p class="card-text instruction" style='text-align:justify'>${strInstructions}</p>
                        <p class="card-text fw-bold text-primary">Recipe: ${strYoutube}</p>
                        <iframe class='iFrame' src="${urlLink}">
                        </iframe>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick='closeModal()'>Close</button>
                    </div>
                </div>
                </div>
            </div>
    `;
        modal.style.display = "block";
    });
}
// When the user clicks on <span> (x), close the modal
function closeModal() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}