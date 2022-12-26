const deleteColumn = async (id) => {
  await fetch(`/api/templates/columns/${id}`, {method: 'DELETE'})
}