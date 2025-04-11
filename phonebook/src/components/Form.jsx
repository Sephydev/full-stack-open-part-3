const Form = ({
  handleSubmit,
  newName,
  handleNewName,
  newNumber,
  handleNewNumber
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name: </label>
        <input id='name' value={newName} onChange={handleNewName} />
        <br />
        <label htmlFor='number'>Number: </label>
        <input id='number' value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}

export default Form