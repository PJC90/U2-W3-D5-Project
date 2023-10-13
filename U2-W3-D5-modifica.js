const addressBar = new URLSearchParams(location.search)
const eventId = addressBar.get('eventId')
console.log(eventId)

const deleteEvent = function () {
  const key =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWNlYjEzOWM0MzAwMTg4MTQ1NWQiLCJpYXQiOjE2OTcxODA5MDcsImV4cCI6MTY5ODM5MDUwN30.c-24csoPtqY_GY6UJZnCLmYvfNrRgkTQrJjdmmlVjyE'

  fetch('https://striveschool-api.herokuapp.com/api/product/' + eventId, {
    method: 'DELETE',
    headers: {
      Authorization: key,
    },
  })
    .then((res) => {
      if (res.ok) {
        alert('Prodotto cancellato')
        location.assign('./U2-W3-D5-index.html')
      } else {
        alert('Problema nel cancellare il prodotto')
        throw new Error('Errore nel method DELETE')
      }
    })
    .catch((err) => {
      console.log('Errore:', err)
    })
}

const generaProdottiModifica = function (prr) {
  const row = document.getElementById('modifica-prodotti')
  row.innerHTML = `
    <div class="card">
          <img src="${prr.imageUrl}" class="card-img-top" >
          <div class="card-body">
              <h5 class="card-title">${prr.name}</h5>
              <p class="card-text">${prr.description}</p>
              <p class="card-text">Prezzo: ${prr.price}€</p>
              <button class="btn btn-danger" onclick="deleteEvent()">ELIMINA</button>
              <a class="btn btn-info" href="./U2-W3-D5-back-office.html?eventId=${prr._id}" class="btn btn-primary">MODIFICA</a>
          </div>
      </div>
    `
}

const generaProdotti = function () {
  const key =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWNlYjEzOWM0MzAwMTg4MTQ1NWQiLCJpYXQiOjE2OTcxODA5MDcsImV4cCI6MTY5ODM5MDUwN30.c-24csoPtqY_GY6UJZnCLmYvfNrRgkTQrJjdmmlVjyE'
  fetch('https://striveschool-api.herokuapp.com/api/product/' + eventId, {
    headers: {
      Authorization: key,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Errore nel generare scheda prodotto')
      }
    })
    .then((eventProduct) => {
      generaProdottiModifica(eventProduct)
    })
    .catch((err) => console.log('Errore', err))
}

generaProdotti()
