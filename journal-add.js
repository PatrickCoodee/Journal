'use strict'

//get elements

// get journal
const journal = getJournal()

// journal title
const journalTitle = document.querySelector('#journal-title')
// journal body
const journalTextEntry = document.querySelector('#journal-entry')
// BUTTONS
const saveButton = document.querySelector('#save-entry')
const deleteButton = document.querySelector('#delete-entry')


// save entry to journal array
saveButton.addEventListener('click', () => {

  // check if entries are not empty
  const isEmpty = journalTitle.value === '' || journalTextEntry.value === ''
  
  if (isEmpty) {
    alert('Please enter required fields')
  } else {
    journal.push({
      title: journalTitle.value,
      id: uuidv4(),
      timestamp: moment().valueOf(),
      body: journalTextEntry.value
    })
    saveJournal(journal)
  
    // reset value
    journalTitle.value = ''
    journalTextEntry.value = ''
  
    // load back to index
    location.assign('/')
  }
  
})

