// stock data retrival function
var getStockData = function (stockName) {
    // First API options
    var options = {
        method: 'GET',
        url: 'https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=' + stockName,
        headers: {
            'x-api-key': 'U5guRICSkz61O4soqPQgh4HCjdIuKx45a0kNH0uU'
        }
    };
    // First API request/response
    axios.request(options).then(function (response) {
        //stock Symbol data
        var stockSymbol = response.data.ResultSet.Result[0].symbol
        // second API options
        var options = {
            method: 'GET',
            url: "https://yfapi.net/v8/finance/chart/" + stockSymbol + "?range=5d&region=US&interval=1d&lang=en&events=div%2Csplit",
            headers: {
                'x-api-key': 'U5guRICSkz61O4soqPQgh4HCjdIuKx45a0kNH0uU'
            }
        };
        // second API request/response
        axios.request(options).then(function (response) {
            // data startpoint 
            var startPoint = response.data.chart.result[0];
            console.log(startPoint);
            //latest stock info
            var latestHigh = (startPoint.indicators.quote[0].high[4]).toString().slice(0, 6);
            var latestLow = (startPoint.indicators.quote[0].low[4]).toString().slice(0, 6);
            var latestOpen = (startPoint.indicators.quote[0].open[4]).toString().slice(0, 6);
            var latestClose = (startPoint.indicators.quote[0].close[4]).toString().slice(0,6);

            // latest stock date
            var latestDate = new Date(startPoint.timestamp[4] * 1000);
            var latestMonth = latestDate.getMonth() + 1;
            var latestDay = latestDate.getDate();
            var latestYear = latestDate.getFullYear();

            // stock section display
            $('#stockNameDisplay').text(stockName);
            $('#stockSymbol').text(stockSymbol);
            $('#stockDateDisplay').text('(' + latestMonth + '/' + latestDay + '/' + latestYear + ')');
            $('#stockHighDisplay').text('High: $' + latestHigh);
            $('#stockLowDisplay').text('Low: $' + latestLow);
            $('#stockOpenDisplay').text('Open: $' + latestOpen);
            $('#stockCloseDisplay').text('Close: $' + latestClose);
            $('#stockDisplay').addClass('border bg-secondary')
        })
    }).catch(function(error){
        $('#errorModal').modal('show')
        
        
    })
}

$('#searchStockBtn').on('click', function () {
    var searchedStock = $('#searchStockInput').val();
    getStockData(searchedStock);
});

    // crypto data retrival function
    var getCryptoData = function(cryptoName) {
        apiUrl = "https://api.coingecko.com/api/v3/coins/" + cryptoName + "?localization=false"

        fetch(apiUrl)
            .then(function(response) {
                response.json().then(function(data) {
                    // Crypto Data Variables
                    var cryptoDate = (data.market_data.last_updated).slice(0, 10)
                    var cryptoImage = data.image.thumb
                    var cryptoSymbol = data.symbol
                    var cryptoPrice = data.market_data.current_price.usd
                    var cryptoHigh = data.market_data.high_24h.usd
                    var cryptoLow = data.market_data.low_24h.usd
                    // Crypto Data Display
                    $("#cryptoNameDisplay").text(cryptoName)
                    $("#cryptoSymbol").text(cryptoSymbol)
                    $("#cryptoImageDisplay").attr("src", cryptoImage)
                    $("#cryptoDateDisplay").text(cryptoDate)
                    $("#cryptoPriceDisplay").text("Current Price: $" + cryptoPrice)
                    $("#cryptoHighDisplay").text("24Hr High: $" + cryptoHigh)
                    $("#cryptoLowDisplay").text("24Hr Low: $" + cryptoLow)
                    $("#cryptoDisplay").addClass('border bg-secondary')
                    $("#cryptoImageDisplay").removeClass("d-none")
                    console.log(data)
                })
            })
    }

        

    $('#searchCryptoBtn').on('click', function() {
        var searchedCrypto = $('#searchCryptoInput').val();
        getCryptoData(searchedCrypto);
    })
