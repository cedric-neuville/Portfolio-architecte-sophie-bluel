const SubmitButton = document.getElementById('select-all')
const email = document.getElementById('email')
const password = document.getElementById('password')
const message = document.createElement('p')


// fonction pour se connecter

SubmitButton.addEventListener('click', async (event) =>{ 
    event.preventDefault()

    const res = await fetch("http://localhost:5678/api/users/login",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    });
   
    message.setAttribute('id', 'to-delete')
    message.innerText = ''
    message.style.color = 'red'

    if (!res.ok) {
            const error = await res.json()
            message.innerText = 'Erreur dans l\'identifiant ou le mot de passe'
            document.getElementById('login-form').appendChild(message)              
    } else {
        // on recupère le token
            message.innerText = ''
            const data = await res.json()
            const token = data.token
            sessionStorage.setItem('token', token)
            window.location.href = './index.html'
    }
})














