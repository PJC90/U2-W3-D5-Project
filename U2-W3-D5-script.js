// const reset = function () {
//   fetch('https://striveschool-api.herokuapp.com/api/product', {
//     headers: {
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWNlYjEzOWM0MzAwMTg4MTQ1NWQiLCJpYXQiOjE2OTcxODA5MDcsImV4cCI6MTY5ODM5MDUwN30.c-24csoPtqY_GY6UJZnCLmYvfNrRgkTQrJjdmmlVjyE',
//     },
//   })
//     .then((res) => {
//       if (res.ok) {
//         const eliminaTutto = document.querySelectorAll('.card')
//         eliminaTutto.forEach((card) => {
//           card.remove()
//         })
//         alert('Prodotti eliminati')
//         return res.json()
//       } else {
//         alert("Problema nell'eliminare")
//         throw new Error('Errore nel DELETE')
//       }
//     })

//     .catch((err) => {
//       console.log("errore nell'eliminare i prodotti", err)
//     })
// }

const creaProdotti = function (arrayEventi) {
  const row = document.getElementById('prodotti')
  arrayEventi.forEach((event) => {
    const newCol = document.createElement('div')
    newCol.classList.add('col-12', 'col-sm-6', 'col-md-4')
    newCol.innerHTML = `
      <div class="card">
          <img src="${event.imageUrl}" class="card-img-top" >
          <div class="card-body">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
              <p class="card-text">${event.price}</p>
              
              <p class="card-text">Prezzo: ${event.price}€</p>
              <a href="./U2-W3-D5-modifica.html?eventId=${event._id}" class="btn btn-primary">DETTAGLI</a>
          </div>
      </div>
      `
    row.appendChild(newCol)
  })
}

const getEvent = function () {
  fetch('https://striveschool-api.herokuapp.com/api/product', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWNlYjEzOWM0MzAwMTg4MTQ1NWQiLCJpYXQiOjE2OTcxODA5MDcsImV4cCI6MTY5ODM5MDUwN30.c-24csoPtqY_GY6UJZnCLmYvfNrRgkTQrJjdmmlVjyE',
    },
  })
    .then((res) => {
      spinner()
      console.log('Response', res)
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Errore nel server')
      }
    })
    .then((event) => {
      console.log('Eventi Generati', event)
      //creo le card con la funzione creaProdotti
      creaProdotti(event)
    })
    .catch((err) => {
      spinner()
      console.log('Si è verificato un errore', err)
    })
}

getEvent()

const spinner = function () {
  const spinner = document.getElementById('spinner')
  spinner.classList.add('d-none')
}
