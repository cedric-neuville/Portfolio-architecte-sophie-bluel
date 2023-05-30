//récupération des travaux dans le fichier JSON
let works_response = await fetch("http://localhost:5678/api/works");
let works = await works_response.json();


function displayWorks(myWorks) {
  const portfolio = document.querySelector('.gallery')
  portfolio.innerHTML = ""
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


const loginBanner = document.getElementById("login-banner")
const logoutLink = document.querySelector(".logout-link")
const modificationArticle = document.getElementById("modification-article")
const modificationProjet = document.getElementById("modification-projet")
const modificationPhotoDeProfil = document.getElementById("modification-photo-de-profil")


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



  let categories_response = await fetch("http://localhost:5678/api/categories");
  let categories = await categories_response.json();
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
  })
}

// envoie d'un nouveau work

export async function postNetwork (data) {
  const token = sessionStorage.getItem("token");
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data, 
  };
  return await fetch("http://localhost:5678/api/works", options);

}

// suppression d'un work
export async function deleteWork(id) {
  const token = sessionStorage.getItem("token");
  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };
  return await fetch(`http://localhost:5678/api/works/${id}`, options);
}

