from math import e
import requests
import random
import time
import os
import turtle

stockLib=[]
stockList=[]
stockListBuilt='false'
##Ploygon.io API key
apiKey='mkGOVplUHi3peEfiitQfSzWD67dtKfmM'
##To DO
##Need to pull all API data at start to avoid API call limits to program
##Currently limitted at 5 calls a minute 


print('Welcome')
def menuScreen():
    print('What would you like to do?.....')
    print('Please enter option below:  ')
    print('Option 1: Search For a stock')
    print('Option 2: Get List of Stocks')
    print('Option 3: Random Picker')
    print('Option 4: Quit')

    menuSelection = input("Enter your Selection:  ")
    if menuSelection == "1":
        getStock()
    elif menuSelection == "2":
        getList()
    elif menuSelection == "3":
        randomStock()

    elif menuSelection =="4":
        os._exit(1)
    else:
        print("Invalid Choice") 

    

def getStock():
    ticker = input('Enter Ticker: ')
    api_url = f'https://api.polygon.io/v3/reference/tickers/{ticker}?apiKey=mkGOVplUHi3peEfiitQfSzWD67dtKfmM'
    data = requests.get(api_url).json()
    print(data['results'].get('description','No Description'))
    
    menuScreen()

def getStockDetails(ticker):
    api_url = f'https://api.polygon.io/v3/reference/tickers/{ticker}?apiKey=mkGOVplUHi3peEfiitQfSzWD67dtKfmM'
    stockdetails = requests.get(api_url).json()
    return stockdetails['results'].get('description','No Description')

def getList():
    list_api_url = f'https://api.polygon.io/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&apiKey=mkGOVplUHi3peEfiitQfSzWD67dtKfmM'
    listData = requests.get(list_api_url).json()
    i=1
    for stock in listData['results']:
        
        print("Stock #" + str(i) )
        print("Name: " + stock['name'])
        print("Ticker: " + stock['ticker'])
        print("Description: " + getStockDetails(stock['ticker']))
        print("---------------------------------------------")
        i+=1
    menuScreen()


def randomStock():
    global stockListBuilt
    if(stockListBuilt =='false'):
        buildAllStocks()
        stockListBuilt='true'
    print('\n'*3)
    time.sleep(1)
    print('Our dogs are fetching your stock')
    for x in range(5):
        print('woof....')
        time.sleep(1)
        
    print('*************************************************')
    stockPick=random.choice(stockList)['ticker']
    print('Your Stock is ' + stockPick +" !")
    print('\n')
    time.sleep(2)
    print('Buddy will tell you about your stock')
    print('\n')
    time.sleep(2)
    print('hello im buddy and I will help you with my vast stock knowledge')
    print('\n')
    time.sleep(2)
    print('About Your Stock: ' + getStockDetails(stockPick))
    print('\n')
    time.sleep(2)
    print('*************************************************')
    print('\n'*2)
    print("Returning to menu screen.........")
    time.sleep(5)
   
    menuScreen()


def buildAllStocks():
    build_api_url = 'https://api.polygon.io/v3/reference/tickers?type=CS&market=stocks&exchange=XNAS&active=true&sort=ticker&order=asc&limit=1000&apiKey=mkGOVplUHi3peEfiitQfSzWD67dtKfmM'
    buildListData = requests.get(build_api_url).json()
    stockLib.append(buildListData['results'])
    
    try:
        while(buildListData['next_url'] != ""):
            nextURL=buildListData['next_url']
            build_api_url = nextURL + '&apikey=' + apiKey
            buildListData = requests.get(build_api_url).json()
            stockLib.append(buildListData['results'])

            """try:
                print(buildListData['next_url'])
            except:
                print("No More")
            """
           
    except:
        pass
        
    for x in range(len(stockLib)):
        global stockList 
        stockList= stockList + stockLib[x]
    
    print('Stock List Built with ' + str(len(stockList)) + ' stocks!')
       
    

##Launch menu screen 
menuScreen()