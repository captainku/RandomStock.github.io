

function getStock(){
    let randomStock = stockData[Math.floor(Math.random()*stockData.length)];
    document.getElementById('stockResultSymbol').innerHTML = randomStock.Symbol;
    document.getElementById('stockResultName').innerHTML = randomStock.Name;
    document.getElementById('stockResultIndustry').innerHTML = randomStock.Industry;

    const WebSocket = require('ws')

    const APIKEY = process.env.POLY_API_KEY || 'YOUR_API_KEY'
    const ws = new WebSocket('wss://socket.polygon.io/forex')
    
    // Connection Opened:
    ws.on('open', () => {
        console.log('Connected!')
        ws.send(`{"action":"auth","params":"${APIKEY}"}`)
        ws.send(`{"action":"subscribe","params":"C.AUD/USD,C.USD/EUR,C.USD/JPY"}`)
    })
    
    // Per message packet:
    ws.on('message', ( data ) => {
        data = JSON.parse( data )
        data.map(( msg ) => {
            if( msg.ev === 'status' ){
                return console.log('Status Update:', msg.message)
            }
            console.log('Tick:', msg)
        })
    })
    
    ws.on('error', console.log)
    

    console.log("Ran");

}


