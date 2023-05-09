const portfolio = document.querySelector('gallery')
const SubmitButton = document.getElementById('selectAll')
const email = document.getElementById('email')
const password = document.getElementById('password')

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
    let message = document.createElement('p')
    message.setAttribute('id', 'toDelete')
    message.innerText = ''
    message.style.color = 'red'

    

    if (!res.ok) {
            const error = await res.json()
            message.innerText = 'Erreur dans l\'identifiant ou le mot de passe'
            document.getElementById('login-form').appendChild(message)              
    } else {
            message.innerText = ''
            const data = await res.json()
            const token = data.token
            localStorage.setItem('token', token)
            window.location.href = './index.html'
    }
})














