//récupération des travaux dans le fichier JSON
let works_response = await fetch("http://localhost:5678/api/works");
let works = await works_response.json();

function displayWorks(myWorks){
  const portfolio = document.querySelector('.gallery')
portfolio.innerHTML=""
//on créer ses éléments depuis le code JavaScript
myWorks.forEach(work => {
    const figure = document.createElement('figure')
    figure.id = `project-${work.id}`
    const img = document.createElement('img')
    img.src = work.imageUrl
    img.alt = work.title
    figure.appendChild(img)
    const figcaption = document.createElement('figcaption')
    figcaption.textContent = work.title
    figure.appendChild(figcaption)
    portfolio.appendChild(figure)
  })

}
displayWorks(works)


let categories_response = await fetch("http://localhost:5678/api/categories");
let categories = await categories_response.json();
categories.unshift({id:0,name:"tous"})



const divCategories = document.createElement("div");
divCategories.classList.add("filter");
portfolio.insertAdjacentElement("beforebegin",divCategories)

categories.forEach(category => {
    const categoryButton = document.createElement('button')
    categoryButton.innerText = category.name
    categoryButton.classList.add('button-style')

// On ajoute la classe "active" au bouton "Tous" (id: 0 étant "Tous")
if (category.id === 0) {
    categoryButton.classList.add('active')
        }
        categoryButton.addEventListener('click', () => {
          // On filtre les oeuvres à afficher en fonction de la catégorie sélectionnée
        let works_filtred =
          category.id === 0
            ? works // Si 'Tous' est sélectionné, on affiche toutes les oeuvres
            : works.filter(work => work.categoryId === category.id) // Sinon, on affiche seulement les oeuvres de la catégorie sélectionnée
        displayWorks(works_filtred)
   
          // On met la classe "active" au filtre sélectionné
        const activeButton = document.querySelector('.active')
        if (activeButton) {
          activeButton.classList.remove('active')
        }
        categoryButton.classList.add('active')
        
      })
    divCategories.appendChild(categoryButton)
});

