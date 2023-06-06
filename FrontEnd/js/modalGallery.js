import {works} from "./index.js";
function createCard(work) {
  const card = document.createElement("div");
  card.classList.add("card");
  const bin = document.createElement("img");
  bin.classList.add("bin");
  bin.src = "./assets/icons/binIcon.png";
  bin.alt = "supprimer";
  bin.addEventListener("click", async (event) => {
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
  card.appendChild(bin);
  card.appendChild(img);
  card.appendChild(edition);
  return card;
}

// Actualisation de la galerie modale avec les works
export function majModalgallery(listOfWorks) {
  const modalGallery = document.getElementById("gallery-modal");
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
  
  majModalgallery(works);
  console.log(works)