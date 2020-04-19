function reducer(state = { photos: [] }, action) {
  switch (action.type) {
    case "photos_fetch":
      return {
        isLoading: true,
        error: {}
      }
    case "photos_success":
      return {
        photos: action.value.photos,
        isLoading: false,
        error: {}
      }
    case "photos_failure":
      return {
        isLoading: false,
        error: action.value.error
      }
    default:
      return []
  }
}

export default reducer;