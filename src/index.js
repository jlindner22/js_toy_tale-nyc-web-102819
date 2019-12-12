const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyCollection = document.getElementById("toy-collection")
let addToyForm = document.getElementsByClassName("add-toy-form")[0]
let likeButton = document.getElementsByClassName("like-btn")
let span = document.getElementsByTagName('span')

function getToys(){
    fetch('http://localhost:3000/toys')
    .then(function(response){return response.json()})
    .then(function(toys){ 
      toys.forEach(function(toy){
        let card = document.createElement('div')
        card.setAttribute('class', 'card');
        card.setAttribute('data-id', `${toy.id}`);
        card.innerHTML = `
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p><span>${toy.likes}</span> Likes</p>
          <button class="like-btn" data-id="like">Like <3</button>
        `
        toyCollection.appendChild(card)
      })
    })
}


getToys()


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

function createToy(newToy){
  fetch('http://localhost:3000/toys', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json'
          },
          body: JSON.stringify(newToy)
          })
        }
addToyForm.addEventListener("submit", function (e) {
  e.preventDefault()
  let name = e.target.name.value
  let image = e.target.image.value
  let likes = 0
  console.log(name)

  let newToy = { name: name, image: image, likes: 0 }

  createToy(newToy)
})



// addToyForm.addEventListener("submit", function(e){
//    e.preventDefault()
//   let toyName = document.getElementsByClassName("input-text")[0].value
//   let toyImage = document.getElementsByClassName("input-text")[1].value
//   console.log(toyImage)
//   fetch('http://localhost:3000/toys', {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//         accept: 'application/json'
//       },
//       body: JSON.stringify({
//         "name": `${toyName}`,
//         "image": `${toyImage}`,
//         "likes": 0
//     })
//     })
//     let card = document.createElement('div')
//         card.setAttribute('class', 'card');
//         card.setAttribute('data-id', `${toy.id}`);
//         card.innerHTML = `
//           <h2>${toy.name}</h2>
//           <img src=${toy.image} class="toy-avatar" />
//           <p>${toy.likes} Likes </p>
//           <button class="like-btn" data-id="like">Like <3</button>
//         `
//         toyCollection.appendChild(card)
// })


//update likes patch request
function updateLikes(id, likes) {
  document.addEventListener("click", function (e) {
    let toyDiv = e.target.parentNode
        if (e.target === likeButton){
        console.log(toyDiv)    
        e.target.id === likes
        updateLikes(e.target.id, e.target.likes)
        e.target.likes = parseInt(e.target.likes) + 1
        likes = parseInt(likes) + 1

        fetch('http://localhost:3000/toys/${id}', {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            accepts: "application/json"
        },
        body: JSON.stringify({likes})
       })
    }
  })
}

