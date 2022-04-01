var apiKeyPolygon = "OVeW3yA0UgwO9aBeWU0HvkLBYmVeJ3Ev"

var getCryptoData = function() {
    var apiUrl = "https://api.polygon.io/v1/open-close/crypto/BTC/USD/2022-03-31?adjusted=true&apiKey=OVeW3yA0UgwO9aBeWU0HvkLBYmVeJ3Ev"

    fetch(apiUrl)
        .then(function(response){
            response.json().then(function(data) {
                console.log(data)
            })
        })
}
getCryptoData()