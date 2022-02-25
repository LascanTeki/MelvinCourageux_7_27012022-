let recipes = Getrecipes();

async function displayRecipes(recipes) {
    const section = document.getElementById("recipes");
    const filter = document.getElementsByClassName("blue");
    const filter2 = document.getElementsByClassName("green");
    const filter3 = document.getElementsByClassName("red");
    let app = [];
    let us = [];
    let ingr = [];

    recipes.forEach((recip) => {
        const { name, ingredients, time, description, appliance, ustensils } = recip;

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

    Tag(filter2, app, "g")
    Tag(filter3, us, "r")
    Tag(filter, ingr, "b")

    filters = document.getElementsByClassName("dropdown-item");

    for (let i = 0; i < filters.length; i++) {
        filters[i].addEventListener('click', tagging)
    }
}

function Tag(filter, content, color) {
    content = content.map(element => {
        return element.charAt(0).toUpperCase() + element.toLowerCase().slice(1);
    });

    content = [...new Set(content)];

    for (i = 0; i < content.length; i++) {
        const a = document.createElement('a');
        const ap = document.createElement('li');
        ap.textContent = content[i];
        ap.setAttribute("class", color);
        a.setAttribute("class", "dropdown-item");
        a.appendChild(ap);
        filter[1].appendChild(a);
    }
}

class Filter {

    static filter(filter, recipes) {
        console.log("still")
        return recipes.filter(function (el) {
            let f;
            for (let i = 0; i < el.ingredients.length; i++) {

                f = + el.ingredients[i].ingredient.toLowerCase().indexOf(filter.toLowerCase()) !== -1
            }
            console.log(el.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || el.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || f);
            return el.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || el.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || f
        });
    }

    static tags(e, list) {
        console.log(e.textContent);
        if (e.className === "g" || e.className === "tags g") {
            console.log("g");
            list = list.filter(function (el) {
                return el.appliance.toLowerCase().indexOf(e.textContent.toLowerCase()) !== -1;
            });
        }
        if (e.className === "b" || e.className === "tags b") {
            let f;
            list = list.filter(function (el) {
                for (let i = 0; i < el.ingredients.length; i++) {
                    f = + el.ingredients[i].ingredient.toLowerCase().indexOf(e.textContent.toLowerCase()) !== -1;
                }
                return f
            });
        }
        if (e.className === "r" || e.className === "tags r") {
            let f;
            list = list.filter(function (el) {
                for (let i = 0; i < el.ustensils.length; i++) {
                    f = + el.ustensils[i].toLowerCase().indexOf(e.textContent.toLowerCase()) !== -1;
                }
                return f
            });
        }
        console.log(list);
        return list;
    }

}

function display(recipes) {
    ul = document.getElementById("recipes");
    f1 = document.getElementsByClassName("blue");
    f2 = document.getElementsByClassName("green");
    f3 = document.getElementsByClassName("red");
    filtering = document.getElementsByClassName("tags");
    ul.innerHTML = "";
    f1[1].innerHTML = "";
    f2[1].innerHTML = "";
    f3[1].innerHTML = "";
    for (let i = 0; i < filtering.length; i++) {
        
        let filt = filtering[i].cloneNode(true);
        filt.textContent = filt.textContent.replace('x', '')
        filt.innerHTML = filt.innerHTML.replace('<span class="txt">', '')
        filt.innerHTML = filt.innerHTML.replace('<span class="fa-stack fa-1x">', '')
        filt.innerHTML = filt.innerHTML.replace('<i class="far fa-circle fa-stack-1x" aria-hidden="true">', '')
        filt.innerHTML = filt.innerHTML.replace('</i><span class="x fa-stack-1x">', '')
        filt.innerHTML = filt.innerHTML.replace('x</span></span>', '')
        console.log(filt);
        recipes = Filter.tags(filt, recipes)
    }
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    if (filter.length >= 3) {
        recipes = Filter.filter(filter, recipes);

    }
    recipes.sort(function (a, b) {
        let idA = new Date(a.id), idB = new Date(b.id)
        return idA - idB
    });
    displayRecipes(recipes);
}

const tagging = async function (e) {
    tags = document.getElementById("tags");
    const tag = document.createElement('a');
    tag.innerHTML = `<span class = "txt">${e.target.textContent}</span><span class="fa-stack fa-1x"><i class="far fa-circle fa-stack-1x"></i><span class="x fa-stack-1x">x</span></span>`;
    tag.setAttribute("class", `tags ${e.target.className}`);
    tags.appendChild(tag);

    tag.addEventListener('click', function (e) {
        tag.remove();
        display(recipes);
    });

    display(recipes);
}

async function init() {
    await displayRecipes(recipes);
    input = document.getElementById("myInput");
    filter = document.getElementsByClassName("dropdown-item");

    input.addEventListener('keyup', () => {
        display(recipes);
    });

}

init();
