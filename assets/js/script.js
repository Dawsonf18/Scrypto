var getStockData = function(stockName) {

var options = {
  method: 'GET',
  url: 'https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=' + stockName,
  headers: {
    'x-api-key': 'oRR9sOAR2w9p3NQiFl5fS5A5jwP2FS0k9A033nLd'
  }
};

axios.request(options).then(function (response) {
	var stockSymbol = response.data.ResultSet.Result[0].symbol

    var options = {
        method: 'GET',
        url: "https://yfapi.net/v8/finance/chart/" + stockSymbol + "?range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit",
        headers: {
          'x-api-key': 'oRR9sOAR2w9p3NQiFl5fS5A5jwP2FS0k9A033nLd'
        }
      };

      axios.request(options).then(function (response) {
          var startPoint = response.data.chart.result[0]
          console.log(startPoint)
      }).catch(function (error) {
        console.error(error);
    });
}).catch(function (error) {
	console.error(error);
});
}

$("#searchStockBtn").on("click", function() {
    var searchedStock = $("#searchStockInput").val()
    getStockData(searchedStock)    
});
