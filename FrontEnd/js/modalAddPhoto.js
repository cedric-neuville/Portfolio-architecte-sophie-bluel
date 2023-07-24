
import {categories} from "./index.js";
import {works, displayWorks} from "./index.js";
 import {majModalgallery} from "./modalGallery.js"
let imgOk = false;
let titleOk = false;
let catOk = false;

function createOptionsByCategories(cat) {
  let select = document.getElementById('category')
  cat.map((category) => {
    const option = document.createElement('option');
    option.value = category.id;
    option.text = category.name;
    select.appendChild(option);
  });
}

createOptionsByCategories(categories)



  function togglePreview() {
    document.querySelector('.preview').classList.toggle('hidden')
    document.querySelector('.selection').classList.toggle('hidden')
  }

  let imageUrl = document.getElementById('image')
  imageUrl.addEventListener('change', () => {
    const file = imageUrl.files[0];
    const maxSize = 4 *1024*1024;
    const authorizedType = /(jpg|jpeg|png)$/; 
    if ( file.size > maxSize) {
        console.log('taille non valide')
        document.getElementById('error-img').textContent = 'taille non valide'
        imgOk = false
        checkEntries()
        return false
    }
    if (!authorizedType.test(file.type)) {
        console.log('type non valide')
        document.getElementById('error-img').textContent = 'type de fichier non valide'
        imgOk = false
        checkEntries()
        return false
    }
    let imgPreview = document.getElementById('img-preview')
    imgPreview.src = URL.createObjectURL(file)
    imgPreview.onload = () => {
        URL.revokeObjectURL(imgPreview.src)
        togglePreview()
    };
  imgOk = true
  checkEntries()
  })

  function checkEntries() {
    if (imgOk && titleOk && catOk) {
      document.getElementById('project-submit').disabled = false
     
      document.getElementById('error-form').textContent = ''
     
    }else {
      document.getElementById('project-submit').disabled = true
      document.getElementById('error-form').textContent = 'Impossible de poster un nouveau projet'
     
    }
  }

let title = document.getElementById('title')
  title.addEventListener('change', function() {
    
    if(this.value.length < 3 || this.value.length > 50) {
      document.getElementById('error-title').textContent = 'taille du texte non valide'
      titleOk = false
    }else {
      document.getElementById('error-title').textContent = ''
      titleOk = true
    }
    checkEntries()
  });
  
  let categoryId = document.getElementById('category')
  categoryId.addEventListener('change', function() {
    if(this.value) {
      document.getElementById('error-category').textContent = ''
      catOk = true 
    }else {
      catOk = false
      console.log('pas de catégories sélectionnées')
      document.getElementById('error-category').textContent = 'aucune catégorie selectionnée'
     
    }
    checkEntries()
  })




let form = document.getElementById('add-work-form')
form.addEventListener('submit', function(e) {
  e.preventDefault()
  let formData = new FormData(this)
  const token = sessionStorage.getItem("token");
  const options = {
        method: "POST",
        headers: {
          // accept: "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: formData, 
      };
     fetch("http://localhost:5678/api/works", options)
      .then(res => res.json())
      .then(work => {
        works.push(work);
        displayWorks(works);
        majModalgallery(works);
      })
  
});