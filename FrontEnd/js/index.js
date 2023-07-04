//récupération des travaux dans le fichier JSON

let works_response = await fetch("http://localhost:5678/api/works");
export let works = await works_response.json();


function displayWorks(myWorks) {
  const portfolio = document.querySelector('.gallery')
  portfolio.innerHTML = ""
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


const loginBanner = document.getElementById("login-banner")
const logoutLink = document.querySelector(".logout-link")
const modificationArticle = document.getElementById("modification-article")
const modificationProjet = document.getElementById("modification-projet")
const modificationPhotoDeProfil = document.getElementById("modification-photo-de-profil")


let categories_response = await fetch("http://localhost:5678/api/categories");
export let categories = await categories_response.json();

if (sessionStorage.getItem("token")) {

  logoutLink.textContent = "logout"
  loginBanner.style.display = "block"
  modificationArticle.style.display = "block"
  modificationProjet.style.display = "block"
  modificationPhotoDeProfil.style.display = "block"

  logoutLink.addEventListener("click", () => {
    sessionStorage.removeItem("token")
    window.location.replace("index.html")
  })


} else {



  
  categories.unshift({ id: 0, name: "tous" })



  const divCategories = document.createElement("div")
  divCategories.classList.add("filter")
  const portfolio = document.querySelector('.gallery')
  portfolio.insertAdjacentElement("beforebegin", divCategories)

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
      let worksFiltred =
        category.id === 0
          ? works // Si 'Tous' est sélectionné, on affiche toutes les oeuvres
          : works.filter(work => work.categoryId === category.id) // Sinon, on affiche seulement les oeuvres de la catégorie sélectionnée
      displayWorks(worksFiltred)

      // On met la classe "active" au filtre sélectionné
      const activeButton = document.querySelector('.active')
      if (activeButton) {
        activeButton.classList.remove('active')
      }
      categoryButton.classList.add('active')

    })
    divCategories.appendChild(categoryButton)
  })
}





