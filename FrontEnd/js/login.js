//récuperation des logins dans le fichier JSON
let logins_response = await fetch("http://localhost:5678/api/users/Login");
let login = await logins_response.json();

const portfolio = document.querySelector('gallery')
const loginForm = document.getElementById('login')
const email = document.getElementById('email').value
const password = document.getElementById('password').value

loginForm.addEventListener('submit', async event => 
    event.preventDefault())


//récupération et enregistrement du token d'authentification
let UserLoggedIn = true
if (UserLoggedIn) {
    const data = await response.json()
    const token = data.token
    localStorage.setItem('token', token)

} else {
    const error = await response.json()
      let alert = document.querySelector('form')
      let message = alert.querySelector('#toDelete')
}


if (!message) {
    message = document.createElement('p')
    message.setAttribute('id', 'toDelete')
    let locationMessage = alert.firstChild
    alert.insertBefore(message, locationMessage)
  }
  if (response.status === 401) {
    message.innerText = 'Erreur: E-mail ou Mot de passe invalide'
  } else {
    // Sinon, on affiche le message d'erreur renvoyé par le serveur
    message.innerText = 'Erreur: ' + error.message
  }
