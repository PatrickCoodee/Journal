// functions that are related to CRUD on local storage


const getJournal = () => {
  // fetch data from local storage then check 
  const journalJSON = localStorage.getItem('journal')
  
  // parse JSON data 
  try {
    return journalJSON ? JSON.parse(journalJSON) : []
  } catch (e) {
    return []
  }
}

const saveJournal = (journalArr) => {

  const journalJSON = JSON.stringify(journalArr) //turn journal array to string
  
  localStorage.setItem('journal', journalJSON) //save to local storage

}

const removeJournal = (id) => {

  //find index if existing
  const journalID = journal.findIndex((journal) => journal.id === id)
  
  // check if id exists
  if (journalID > -1) {
    journal.splice(journalID, 1)
  }
}

const renderJournal = (journal) => {

  journal = sortJournal(journal)
  const journalBody = document.querySelector('#journal-body')
  // reset value of journal body
  journalBody.innerHTML = ''

  // loop over journal array and create entry for each
  journal.forEach( (entry) => {
    const entryEl = generateEntry(entry)

    // append to journal body
    journalBody.appendChild(entryEl)
  })
}


//entry has title, id, timestamp(convert to format), body
const generateEntry = (entry) => {
  // create main div
  const entryDiv = document.createElement('div')
  entryDiv.classList.add('card','light-blue','darken-1')

  // create sub div
  const entryContent = document.createElement('div')
  entryContent.classList.add('card-content', 'white-text')

  // for entry data
  const entryTitle = document.createElement('a')
  // add link 
  entryTitle.setAttribute('href', `journal-view.html#${entry.id}`)
  // add class to title
  entryTitle.classList.add('card-title', 'card-link', 'black-text')
  // add data to title
  entryTitle.textContent = entry.title

  // entry date
  const entryTimestamp = document.createElement('p')
  entryTimestamp.classList.add('journal-date')

  const dateIcon = document.createElement('i')
  dateIcon.classList.add('tiny' ,'material-icons')
  dateIcon.textContent = 'access_time'
  entryTimestamp.appendChild(dateIcon)

  entryTimestamp.textContent = moment(entry.timestamp).format("MMMM / DD / YYYY")


  // text body
  const entryBody = document.createElement('p')
  entryBody.classList.add('journal-text')
  entryBody.textContent = entry.body.split(' ').splice(0,10).join(' ')

  entryContent.appendChild(entryTitle)
  entryContent.appendChild(entryTimestamp)
  entryContent.appendChild(entryBody)
  // end of entry data

  // create div container for separating button
  const delDiv = document.createElement('div')
  delDiv.classList.add('card-action')
  // create delete entry button
  const delButton = document.createElement('a')
  // add textContent
  delButton.textContent = 'delete entry'
  // add class
  delButton.classList.add('red','waves-effect','waves-light', 'btn')

  // add eventListener to delete button
  delButton.addEventListener('click', () => {
    removeJournal(entry.id)
    saveJournal(journal)
    renderJournal(journal)
  })


  // icon element
  const i = document.createElement('i')
  i.classList.add('material-icons', 'left')
  i.textContent = 'delete'
  // append icon to delete button
  delButton.appendChild(i)

  // append button to div
  delDiv.appendChild(delButton)

  // append 2 sub divs to main div
  entryDiv.appendChild(entryContent)
  entryDiv.appendChild(delDiv)


  // return entry
  return entryDiv
}

// sort journal based on date of recent entry
const sortJournal = (journal) => {
  return journal.sort((a,b) => {
    if (a.timestamp > b.timestamp) {
      return -1 
    } else if (a.timestamp < b.timestamp) {
      return 1
    } else {
      return 0
    }
  })
}