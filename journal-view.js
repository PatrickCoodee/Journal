// get has from location 
const entryId = location.hash.substring(1)

// get journals from local storage
const journal = getJournal()

// find entry by id
const entry = journal.find( (journal) => journal.id === entryId )

// check if an entry is undefined
if(!entry) {
  location.assign(`./`)
}

const entryDate = document.createElement('span')
entryDate.classList.add('text-grey','lighten-1','dateEntry')
entryDate.textContent = `DATE WRITTEN: ${moment(entry.timestamp).format('LLLL')}`

// create title
document.querySelector('#entryTitle').textContent = entry.title

// entry content
const entryBody = document.createElement('p')
// add class
entryBody.classList.add('flow-text')
// add content
entryBody.innerText = entry.body
document.querySelector('.card-content').appendChild(entryDate)
document.querySelector('.card-content').appendChild(entryBody)