const Notification = ({ message, isError }) => {
  const messageStyle = {
    borderStyle: "solid",
    borderColor: isError ? "red" : "message",
    borderRadius: 5,
    backgroundColor: isError ? "lightgray" : "lightgreen",
    fontSize: 20,
    padding: 10,
    marginBottom: 20,
    color: isError ? "red" : "green"
  }

  if (message === null) {
    return null
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )

}

export default Notification