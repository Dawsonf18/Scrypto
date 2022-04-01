var getStockData = function(stockName) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
            'X-RapidAPI-Key': '4a78c1e05dmsh2841aa9a1e9a1e3p1c7bb1jsn2eca213d0c16'
        }
    };

    fetch("https://yh-finance.p.rapidapi.com/auto-complete?q=" + stockName +"&region=US", options)
        .then(function(response){
            response.json().then(function(data) {
                console.log(data)
            })
        })
}

$('#searchStockBtn').on('click', function() {
    var searchedStock = $('#searchStockInput').val();
    getStockData(searchedStock); 
})