import {works} from "./index.js";
function createCard(work) {
  const arrow = document.createElement('i')
  arrow.className = "fa-solid fa-arrows-up-down-left-right arrow"
  arrow.id = "arrow"
  const card = document.createElement("div");
  card.classList.add("card");
  const trash = document.createElement("i");
  trash.className = "fa-solid fa-trash-can trash"
  trash.id = "trash"
  trash.addEventListener("click", async (event) => {
    const isDeleted = await suppressWork(event, work.id);
    if (isDeleted === true) {
      card.remove();
      const figureToDelete = document.getElementById("figure" + work.id);
      figureToDelete.remove();
    }
  });
  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;
  const edition = document.createElement("a");
  edition.innerText = "editer";
  card.appendChild(arrow)
  card.appendChild(trash);
  card.appendChild(img);
  card.appendChild(edition);
  return card;
}

// Actualisation de la galerie modale avec les works
export function majModalgallery(listOfWorks) {
  const modalGallery = document.querySelector(".thumbs");
  try {
    modalGallery.innerHTML = "";
    listOfWorks.map((work) => {
      modalGallery.appendChild(createCard(work));
    });
  } catch (err) {
    window.alert("Problême de connection : impossible de charger la gallerie");
  }
}

// Suppression d'un work

async function suppressWork(event, id) {
  if (
    window.confirm("Voulez-vous vraiment supprimer ce projet de la gallerie ?")
  ) {
    event.preventDefault();
    try {
      const deleteResponse = await deleteWork(id);
      return deleteResponse.ok;
    } catch (err) {
      window.alert(
        "Problême de connection : impossible de supprimer le projet"
      );
    }
  }
}

async function deleteWork(id) {
    const token = sessionStorage.getItem("token");
    console.log(token)
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      
    };
    return await fetch(`http://localhost:5678/api/works/${id}`, options);
  }
  
  majModalgallery(works);
  console.log(works)