// stock data retrival function
var getStockData = function (stockName) {
    // First API options
    var options = {
        method: 'GET',
        url: 'https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=' + stockName,
        headers: {
            'x-api-key': 'oRR9sOAR2w9p3NQiFl5fS5A5jwP2FS0k9A033nLd'
        }
    };
    // First API Request/Response
    axios.request(options).then(function (response) {
        // Stock Symbol Data
        var stockSymbol = response.data.ResultSet.Result[0].symbol
        // Second API Options
        var options = {
            method: 'GET',
            url: "https://yfapi.net/v8/finance/chart/" + stockSymbol + "?range=5d&region=US&interval=1d&lang=en&events=div%2Csplit",
            headers: {
                'x-api-key': 'oRR9sOAR2w9p3NQiFl5fS5A5jwP2FS0k9A033nLd'
            }
        };
        // Second API Request/Response
        axios.request(options).then(function (response) {
            // Data Startpoint 
            var startPoint = response.data.chart.result[0];
            console.log(startPoint);
            // latest Stock Info
            var latestHigh = (startPoint.indicators.quote[0].high[4]).toString().slice(0, 6);
            var latestLow = (startPoint.indicators.quote[0].low[4]).toString().slice(0, 6);
            var latestOpen = (startPoint.indicators.quote[0].open[4]).toString().slice(0, 6);
            var latestClose = (startPoint.indicators.quote[0].close[4]).toString().slice(0,6);

            // latest Stock Date
            var latestDate = new Date(startPoint.timestamp[4] * 1000);
            var latestMonth = latestDate.getMonth() + 1;
            var latestDay = latestDate.getDate();
            var latestYear = latestDate.getFullYear();

            // Stock Section Display
            $('#stockNameDisplay').text(stockName);
            $('#stockSymbol').text(stockSymbol);
            $('#stockDateDisplay').text('(' + latestMonth + '/' + latestDay + '/' + latestYear + ')');
            $('#stockHighDisplay').text('High: $' + latestHigh);
            $('#stockLowDisplay').text('Low: $' + latestLow);
            $('#stockOpenDisplay').text('Open: $' + latestOpen);
            $('#stockCloseDisplay').text('Close: $' + latestClose);
            $('#stockDisplay').addClass('border bg-secondary')

            for (let i = 3; i >= 0; i--) {
            // Past Stock Info
            var pastHigh = (startPoint.indicators.quote[0].high[i]).toString().slice(0, 6);
            var pastLow = (startPoint.indicators.quote[0].low[i]).toString().slice(0, 6);
            var pastOpen = (startPoint.indicators.quote[0].open[i]).toString().slice(0, 6);
            var pastClose = (startPoint.indicators.quote[0].close[i]).toString().slice(0,6);
            // Past Stock Date
            var pastDate = new Date(startPoint.timestamp[i] * 1000);
            var pastMonth = pastDate.getMonth() + 1;
            var pastDay = pastDate.getDate();
            var pastYear = pastDate.getFullYear();
            // Past Stock Elements
            var pastStock = document.createElement("div")
            var pastStockName = document.createElement("h3")
            var pastStockSymbol = document.createElement("h3")
            var pastStockDate = document.createElement("h3")
            var pastStockHigh = document.createElement("p")
            var pastStockLow = document.createElement("p")
            var pastStockOpen = document.createElement("p")
            var pastStockClose = document.createElement("p")
            // Past Stock Display
            $(pastStock).addClass("text-center carousel-item text-light")
            $(pastStockName).text(stockName)
            $(pastStockSymbol).text(stockSymbol)
            $(pastStockDate).text('(' + pastMonth + '/' + pastDay + '/' + pastYear + ')')
            $(pastStockHigh).text('High: $' + pastHigh)
            $(pastStockLow).text('Low: $' + pastLow)
            $(pastStockOpen).text('Open: $' + pastOpen)
            $(pastStockClose).text('High: $' + pastClose)
            // Append
            $(pastStock).append(pastStockName, pastStockSymbol, pastStockDate, pastStockHigh, pastStockLow, pastStockOpen, pastStockClose)
            $("#innerStockDisplay").append(pastStock)
            }
        })
    }).catch(function(error){
        if (error) {
            $("#errorModal").modal("show")
        }
    })
}

$('#searchStockBtn').on('click', function () {
    var searchedStock = $('#searchStockInput').val();
    getStockData(searchedStock);
    //Get Search History For Stocks
    
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
                }).catch(function(error){
                    if (error) {
                        $("#errorModal").modal("show")
                    }
                })
            })
    }

    $('#searchCryptoBtn').on('click', function() {
        var searchedCrypto = $('#searchCryptoInput').val();
        getCryptoData(searchedCrypto);
        
    });
