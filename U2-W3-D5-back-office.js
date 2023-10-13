const addressBarContent = new URLSearchParams(location.search)
const eventId = addressBarContent.get('eventId')
console.log('ciao', eventId)

if (eventId) {
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
        throw new Error('ERRORE NEL RECUPERO DETTAGLIO')
      }
    })
    .then((even) => {
      const nameInput = document.getElementById('name')
      const descriptionInput = document.getElementById('description')
      const priceInput = document.getElementById('price')
      const imageUrlInput = document.getElementById('imageUrl')
      const brandInput = document.getElementById('brand')

      nameInput.value = even.name
      descriptionInput.value = even.description
      priceInput.value = even.price
      brandInput.value = even.brand
      imageUrlInput.value = even.imageUrl
    })
    .catch((err) => {
      console.log('err', err)
    })
}

const formRif = document.getElementById('form')
formRif.addEventListener('submit', function (e) {
  e.preventDefault()
  console.log('invio dati')
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const priceInput = document.getElementById('price')
  const imageUrlInput = document.getElementById('imageUrl')
  const brandInput = document.getElementById('brand')

  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    brand: brandInput.value,
    imageUrl: imageUrlInput.value,
  }
  console.log("Ecco l'oggetto che manderò alle API", newProduct)

  let methodToUse = 'POST'
  if (eventId) {
    methodToUse = 'PUT'
  }

  let urlToUse = 'https://striveschool-api.herokuapp.com/api/product'
  if (eventId) {
    urlToUse = 'https://striveschool-api.herokuapp.com/api/product/' + eventId
  }

  const key =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWNlYjEzOWM0MzAwMTg4MTQ1NWQiLCJpYXQiOjE2OTcxODA5MDcsImV4cCI6MTY5ODM5MDUwN30.c-24csoPtqY_GY6UJZnCLmYvfNrRgkTQrJjdmmlVjyE'

  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization: key,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log('ogg', res)
      if (res.ok) {
        alert('Prodotto salvato')
        location.assign('./U2-W3-D5-index.html')
      } else {
        alert('Qualcosa è andato storto')
        throw new Error('err in fase di POST')
      }
    })
    .catch((err) => {
      console.log('Errore ', err)
    })
})
