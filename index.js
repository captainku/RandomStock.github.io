
var tickerResult = "";
var nameResult = "";
var aboutResult = "";
var priceResult = "";
var ticker;
let fullData= {results:""};
var round = 0;
let apiKey = '&apiKey=mkGOVplUHi3peEfiitQfSzWD67dtKfmM';
let fetchURL='https://api.polygon.io/v3/reference/tickers?type=CS&market=stocks&exchange=XNYS&active=true&sort=ticker&order=asc&limit=1000&apiKey=mkGOVplUHi3peEfiitQfSzWD67dtKfmM';
var a = [];
var builtStockList = [];



//Variables for additional stock details fetch
let tickerDetail ='AAPL';
let tickerURL='https://api.polygon.io/v3/reference/tickers/' + tickerDetail + '?apiKey=mkGOVplUHi3peEfiitQfSzWD67dtKfmM';
var tickerDetailArray =[];

//Variables for ticker price fetch

let tickerPriceUrl='https://api.polygon.io/v2/aggs/ticker/'+ tickerDetail +'/prev?adjusted=true&apiKey=mkGOVplUHi3peEfiitQfSzWD67dtKfmM';
var tickerPriceArray =[];



//Random Stock Variables
var listLength;
var  randomNumber;

//Functions--------------------------------------------------------------------

//Go and get data from poly and then start process function
function fetchData(){
  fetch(fetchURL)
  .then(response => response.json())
  .then(data => 
    {
    //Append data to a array.
      a.push(data);
    //Run the process function to add data that was fetched to list
      processData(a);
    })
  
}

//This function adds fetch data to master list 
async function processData(a){
  //Add fetched array onto master built list
  builtStockList = builtStockList.concat(a[round].results);
//Check if there is a nexturl to fetch and if so re run the fetch process
  if(typeof a[round].next_url !== 'undefined'){
    fetchURL=a[round].next_url + apiKey;
    round ++;
    fetchData();
  }
  
  //Else will run once there is no more URL to fetch
  else
  {
    //Print the entire Stock Array 
    console.log("The Master Stock List has been Built!!!!!");
    console.log(builtStockList);
    listLength= builtStockList.length;
    console.log("The Master Stock List is " + listLength + " stocks long");
    //Generte random number 
    randomNumber=Math.floor(Math.random()*listLength);
    console.log(randomNumber);
    
    //Ticker
    tickerResult=builtStockList[randomNumber].ticker;
    //Name
    nameResult=builtStockList[randomNumber].name;


    //Go Get additional ticker data from polygon:
    tickerDetail=tickerResult;
    tickerURL='https://api.polygon.io/v3/reference/tickers/' + tickerDetail + '?apiKey=mkGOVplUHi3peEfiitQfSzWD67dtKfmM';
    tickerDetailArray= await fetchDataTicker();
    console.log(tickerDetailArray);
    aboutResult=tickerDetailArray.results.description;


    //Get Ticker Price 
    tickerPriceUrl='https://api.polygon.io/v2/aggs/ticker/'+ tickerDetail +'/prev?adjusted=true&apiKey=mkGOVplUHi3peEfiitQfSzWD67dtKfmM';
    tickerPriceArray= await fetchDataPrice();
    console.log(tickerPriceArray);
    priceResult=tickerPriceArray.results[0].c;

   



    //Apply results to HTML
    //Get Id of stock result in HTML to display result
    document.getElementById('stockResultTicker').innerHTML = '<b><font size ="4">Stock Ticker: </font></b>' + tickerResult;
    document.getElementById('stockResultName').innerHTML = '<b><font size ="4">Stock Name: </font></b>' + nameResult;
    document.getElementById('stockResultPrice').innerHTML = '<b><font size ="4">Stock Price: </font></b>' + priceResult;
    document.getElementById('stockResultAbout').innerHTML = '<b><font size ="4">About The Stock: </font></b>' + aboutResult;
    var resultDiv = document.getElementById('resultDiv');
    resultDiv.classList.add('css-typing');
    

  }

}



//Start Functions to go get Ticker Details:
async function fetchDataTicker(){
  return fetch(tickerURL)
  .then(response => response.json())
  .then(data => 
    {
    return data;
    })
  
}


//Start Functions to go get Ticker Price:
async function fetchDataPrice(){
  return fetch(tickerPriceUrl)
  .then(response => response.json())
  .then(data => 
    {
    return data;
    })
  
}






