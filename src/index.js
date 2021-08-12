import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
const fetch = require('fetch')

const ContactsHooks = () => {
  const [contact, setContact] = useState([])
  const [keys, setKeys] = useState([])

  const handleFetch = (todoKey) => {
    let contacts
    fetch.fetchUrl('https://jsonplaceholder.typicode.com/users', (e, r, s) => {
      if(e) return
      contacts = JSON.parse(s.toString())
      const randomKey = Math.ceil(Math.random() * 10) - 1
      const randomContact = contacts[randomKey]
      const values = [...Object.values(randomContact)]
      const keys_ = [...Object.keys(randomContact)]

      delete values[4].geo
      const final = values.map(element => {
        let string = element
        if(typeof element === 'object') {
          string = Object.values(element).join(', ')
        }
        return string
      })
      setContact([...final])
      setKeys(keys_) // Optimizar
      console.log(typeof contact, contact)
    })
  }

  useEffect(() => {
    document.title = `Contact: ${contact[1]}`;
  });
  
  return (
    <div>
      <h1>Hello world</h1>
      <button type="button" onClick={handleFetch}>Fetch!</button>
      <br />
      <ul>
        {
        contact.map((value, index) => {
          if(value) { return <li key={index}>{keys[index]}: {value}</li> }
        })
        }
      </ul>
      </div>
  )
}

ReactDOM.render(
  <ContactsHooks />,
  document.getElementById('contacts')
)