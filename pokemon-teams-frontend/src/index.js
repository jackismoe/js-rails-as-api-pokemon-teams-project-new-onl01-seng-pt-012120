document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/trainers')
    .then(response => response.json())
    .then(jsonResponse => renderTrainerCard(jsonResponse))
})

const renderTrainerCard = (trainerArray) => {
  for (const each of trainerArray) {
    let main = document.querySelector('main')
    let div = document.createElement('div')
    let p = document.createElement('p')
    let addBtn = document.createElement('button')
    pokeList = document.createElement('ul')

    div.className = 'card'
    div.setAttribute('data-id', each.id)
    p.innerText = each.name
    addBtn.innerText = 'Add Pokemon'
    addBtn.setAttribute('data-trainer-id', each.id)
    addBtn.className = 'add-button'

    let pokeArray = each.pokemons
    newPokemon(pokeArray)

    main.appendChild(div)
    div.appendChild(p)
    div.appendChild(addBtn)
    div.appendChild(pokeList)

    addBtn.addEventListener('click', () => {
      pokeForm()
    })   

    const pokeForm = () => {
      let form = document.createElement('form')
      let speciesLabel = document.createElement('label')
      let nicknameLabel = document.createElement('label')
      let speciesInput = document.createElement('input')
      let nicknameInput = document.createElement('input')
      let submit = document.createElement('button')

      form.className = 'new-pokemon-form'
      speciesLabel.className = 'new-pokemon-species'
      nicknameLabel.className = 'new-pokemon-nickname'
      speciesInput.className = 'new-pokemon-species'
      nicknameInput.className = 'new-pokemon-nickname'
      submit.className = 'submit'
      submit.innerText = 'Add Pokemon'
      speciesLabel.innerText = 'Species\n'
      nicknameLabel.innerText = 'Nickname\n'

      form.appendChild(speciesLabel)
      form.appendChild(speciesInput)
      form.appendChild(nicknameLabel)
      form.appendChild(nicknameInput)
      form.appendChild(submit)
      addBtn.replaceWith(form)

      submit.addEventListener('click', (e) => {
        e.preventDefault()
        let x = e.target.parentNode
        console.log()
        // need to add pokemon to trainer in current form
      })
    }
  }
}

const newPokemon = (newPoke) => {
  for (const each of newPoke) {
    let eachPokemon = document.createElement('li')
    let releaseBtn = document.createElement('button')

    eachPokemon.innerText = `${each.species} (${each.nickname})`
    releaseBtn.innerText = 'Release'
    releaseBtn.className = 'release'
    releaseBtn.setAttribute('data-pokemon-id', each.id)

    pokeList.appendChild(eachPokemon)
    eachPokemon.appendChild(releaseBtn)

    releaseBtn.addEventListener('click', (e) => {
      let releaseBoolean = confirm('This will release your pokemon in to the wild.\nThis cannot be undone.\nAre you sure?')
      if (releaseBoolean === true) {
        e.toElement.parentElement.remove()
        // pushData()
        // need to fetch post to database to remove pokemon from database
      }
    })
  }
}