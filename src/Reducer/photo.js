function reducer(state = { photos: [] }, action) {
  switch (action.type) {
    case "photos":
      return {
        photos: action.data
      }
    default:
      return state.photos
  }
}

export default reducer;