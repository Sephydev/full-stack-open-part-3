const Numbers = ({ search, persons, handleDelete }) => {
  return (
    <ul>
      {search === "" ?
        persons.map((person) =>
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
          </li>
        )
        :
        persons
          .filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
          .map((person) =>
            <li key={person.id}>
              {person.name} {person.number}
              <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
            </li>
          )

      }
    </ul>
  )
}

export default Numbers