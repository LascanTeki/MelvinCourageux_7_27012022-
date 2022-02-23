async function displayRecipes(recipes) {
    const section = document.getElementById("recipes");
    const filter = document.getElementsByClassName("blue");
    const filter2 = document.getElementsByClassName("green");
    const filter3 = document.getElementsByClassName("red");
    let app = [];
    let us = [];
    let ingr = [];

    recipes.forEach((recip) => {
        const { id, name, ingredients, time, description, appliance, ustensils } = recip;

        const img = document.createElement('img');
        img.setAttribute("src", "./images/Placeholder.jpg");
        img.setAttribute("alt", "Placeholder");

        const titre = document.createElement('div');
        titre.textContent = name;

        const timed = document.createElement('div');
        timed.setAttribute("class", "time");
        timed.innerHTML = `<i class="far fa-clock"></i> ${time} min`;

        const title = document.createElement('div');
        title.setAttribute("class", "title");
        title.appendChild(titre);
        title.appendChild(timed);

        const ings = document.createElement('ul');


        ingredients.forEach((ing) => {
            let { ingredient, quantity, unit } = ing;
            if (unit === undefined) {
                unit = "";
            }
            const inge = document.createElement('li');
            if (quantity === undefined) {
                inge.innerHTML = ` <b>${ingredient}</b>`;
            }
            else {
                inge.innerHTML = ` <b>${ingredient}:</b>  ${quantity} ${unit}`;
            }
            ingr.push(ingredient);
            ings.appendChild(inge);
        });

        const desc = document.createElement('div');
        desc.setAttribute("class", "description");
        desc.textContent = description;

        const contient = document.createElement('div');
        contient.setAttribute("class", "contient");
        contient.appendChild(ings);
        contient.appendChild(desc);

        const cont = document.createElement('div');
        cont.setAttribute("class", "card");
        cont.appendChild(img);
        cont.appendChild(title);
        cont.appendChild(contient);

        section.appendChild(cont);

        app.push(appliance);

        for (let o = 0; o < ustensils.length; o++) {
            us.push(ustensils[o]);
        }

    }
    );

    app = [...new Set(app)];
    us = [...new Set(us)];
    ingr = [...new Set(ingr)];


    for (let i = 0; i < app.length; i++) {
        const a = document.createElement('a');
        const appli = document.createElement('li');
        appli.textContent = app[i];
        appli.setAttribute("class", "dropdown-item");
        a.appendChild(appli);
        filter2[1].appendChild(a);
    }
    for (i = 0; i < us.length; i++) {
        const a = document.createElement('a');
        const appl = document.createElement('li');
        appl.textContent = us[i];
        appl.setAttribute("class", "dropdown-item");
        a.appendChild(appl);
        filter3[1].appendChild(a);
    }
    for (i = 0; i < ingr.length; i++) {
        const a = document.createElement('a');
        const ap = document.createElement('li');
        ap.textContent = ingr[i];
        ap.setAttribute("class", "dropdown-item");
        a.appendChild(ap);
        filter[1].appendChild(a);
    }


}

class Filter {

    static filter(filter, recipes) {
        return recipes.filter(function(el) {

            for (let i = 0; i < el.ingredients.length; i++) {
                var f =+ el.ingredients[i].ingredient.toLowerCase().indexOf(filter.toLowerCase()) !== -1
            }
            return el.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || el.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || f
          });
    }

}


function search(recipes) {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("recipes");
    f1 = document.getElementsByClassName("blue");
    f2 = document.getElementsByClassName("green");
    f3 = document.getElementsByClassName("red");
    if (filter.length >= 3) {

        recipes = Filter.filter(filter, recipes);
        

    }

    ul.innerHTML = "";
    f1[1].innerHTML = "";
    f2[1].innerHTML = "";
    f3[1].innerHTML = "";
    displayRecipes(recipes);

}

async function init() {
    const recipes = await Getrecipes();
    const unique = await displayRecipes(recipes);
    input = document.getElementById("myInput");

    recipes.ready = input.addEventListener('keyup', () => {
        search(recipes);
    });
}

init();
