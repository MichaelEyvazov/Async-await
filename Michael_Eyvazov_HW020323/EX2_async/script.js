let dollarToShekel = async () => {
    let response = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=ILS');
    let data = await response.json();
    return data.rates.ILS;
}

let bitcoinToDollar = async () => {
    let response = await fetch('https://data.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
    let data = await response.json();
    return parseFloat(data.lastPrice);
}

let bitcoinToShekel = async () => {
    let bitcoinRate = await bitcoinToDollar();
    let shekelRate = await dollarToShekel();
    let bitcoinShekelRate = bitcoinRate * shekelRate;
    return bitcoinShekelRate.toFixed(2);
}

let displayBitcoinPrice = async () => {
    let bitcoinPriceElement = document.getElementById('bitcoin-price');
    let bitcoinPrice = await bitcoinToShekel();
    let prevBitcoinPrice = parseFloat(bitcoinPriceElement.dataset.prevPrice);

    if (bitcoinPrice > prevBitcoinPrice) {
        bitcoinPriceElement.classList.remove('red');
        bitcoinPriceElement.classList.add('green');
    } else if (bitcoinPrice < prevBitcoinPrice) {
        bitcoinPriceElement.classList.remove('green');
        bitcoinPriceElement.classList.add('red');
    }

    bitcoinPriceElement.textContent = `מחיר הביטקוין הנוכחי הוא: ₪${bitcoinPrice}`;
    bitcoinPriceElement.dataset.prevPrice = bitcoinPrice;

    setTimeout(displayBitcoinPrice, 15000);
}

displayBitcoinPrice();