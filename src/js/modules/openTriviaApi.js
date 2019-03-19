const mainUrl = 'https://opentdb.com/api.php?'
const getData = (amount) => {
  let url = mainUrl + 'amount=' + amount + '&difficulty=easy&type=multiple'
  return fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (myJson) {
      return myJson.results
    })
}
export default getData