function displayRecipes(recipes) {
    const section = document.getElementById("recipes");
    const filter = document.getElementsByClassName("blue");
    const filter2 = document.getElementsByClassName("green");
    const filter3 = document.getElementsByClassName("red");
    let app = [];
    let us = [];
    let ingr= [];

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

    console.log(ingr);

    for (let i = 0; i < app.length; i++) {
        const appli = document.createElement('li');
        appli.textContent = app[i];
        appli.setAttribute("class", "dropdown-item");
        filter2[1].appendChild(appli);
    }
    for (i = 0; i < us.length; i++) {
        const appl = document.createElement('li');
        appl.textContent = us[i];
        appl.setAttribute("class", "dropdown-item");
        filter3[1].appendChild(appl);
    }
    for (i = 0; i < ingr.length; i++) {
        const ap = document.createElement('li');
        ap.textContent = ingr[i];
        ap.setAttribute("class", "dropdown-item");
        filter[1].appendChild(ap);
    }

}

async function init() {
    const recipes = Getrecipes();
    const unique = displayRecipes(recipes);
}

init();

/*    uniq = [...new Set(uniq)];
console.log(uniq);

const appli = document.createElement('li');
appli.textContent = appliance;
appli.setAttribute("class", "dropdown-item");
filter.appendChild(appli); */