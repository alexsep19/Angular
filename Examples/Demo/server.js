/*
  Start server: node server.js
*/

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);


STOCK_SYMBOLS = [
    { symbol: "GM", open: 38.87 },
    { symbol: "GE", open: 25.40 },
    { symbol: "MCD", open: 97.05 },
    { symbol: "UAL", open: 69.45 },
    { symbol: "WMT", open: 83.24 },
    { symbol: "AAL", open: 55.76 },
    { symbol: "LLY", open: 76.12 },
    { symbol: "JPM", open: 61.75 },
    { symbol: "BAC", open: 15.84 },
    { symbol: "BA", open: 154.50 }
];

let stocks = [];

STOCK_SYMBOLS.forEach(f => {
    stocks.push({
        symbol: f.symbol, open: f.open, high: f.open,
        low: f.open, last: f.open, change: 0, change_idx: -1
    });
});

function updateStocks() {
    let index = Math.floor(Math.random() * stocks.length);

    stocks.forEach(f => f.change_idx = -1);
    stocks[index].change_idx = index;

    let maxChange = stocks[index].open * 0.005;
    let change = maxChange - Math.random() * maxChange * 2;
    let last;

    change = Math.round(change * 100) / 100;
    change = change === 0 ? 0.01 : change;

    last = stocks[index].last + change;

    if (last > stocks[index].open * 1.15 || last < stocks[index].open * 0.85) {
        change = -change;
        last = stocks[index].last + change;
    }

    stocks[index].last = Math.round(last * 100) / 100;
    if (stocks[index].last > stocks[index].high) {
        stocks[index].high = stocks[index].last;
    }

    if (stocks[index].last < stocks[index].low) {
        stocks[index].low = stocks[index].last;
    }

    stocks[index].change = change;
}

// Change stocks 
setInterval(() => updateStocks(), 1000);



// Socket
io.on('connection', (socket) => {
    console.log(`user connected ${socket.client.id}`);

    socket.on('disconnect', function () {
        console.log(`user disconnected ${socket.client.id}`);
    });

    let stocks_watched = STOCK_SYMBOLS.map(m => m.symbol);
  
    socket.on('watch', (data) => {
        console.log(`Data from ${socket.client.id} : watch`);

        let _stocks = stocks.map(m => m.symbol);
        data.forEach(f => {
            let idx = _stocks.indexOf(f);
            if (stocks_watched.indexOf(f) === -1 && idx > -1) {
                stocks_watched.push(stocks[idx].symbol);
            }
        });
    });

    socket.on('unwatch', (data) => {
        console.log(`Data from ${socket.client.id} : unwatch`);

        let idx = stocks_watched.indexOf(data.symbol);
        if (idx != -1) {
            stocks_watched.splice(idx, 1);
        }
    });

    function current_stocks() {
        return Object.assign([], stocks).filter(f => stocks_watched.indexOf(f.symbol) > -1);
    }

    setInterval(() => {
        socket.emit('stocks', current_stocks());
    }, 500);
});

http.listen(9000, () => {
    console.log('server started on port 9000');
});
