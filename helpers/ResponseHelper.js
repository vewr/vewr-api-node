class ResponseHelper {
  success(data) {
    return { success: true, error: false, ...data }
  }

  error(data) {
    return { success: false, error: true, ...data }
  }
}

module.exports = new ResponseHelper();