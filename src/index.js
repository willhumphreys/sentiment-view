import React from 'react';
import ReactDOM from 'react-dom';

function Symbol(props) {
    return <li><a href={`https://s3.amazonaws.com/sentiment-plots/current/${props.value}.png`}>{props.value}</a></li>
}

const API = 'https://hi8hj4u1y1.execute-api.us-east-1.amazonaws.com/prod/currentpicks';
const currencies = ['aud-usd', 'eur-gbp', 'eur-jpy', 'eur-usd', 'gbp-usd', 'nzd-usd', 'usd-cad', 'usd-jpy', 'usd-chf'];
const stocks = ['GOOG', 'Barclays', 'BP'];

const currencyList = currencies.map((symbol) =>
    <li><Symbol value={symbol}/></li>
);

const commodities = ['gold', 'silver', 'us-light-crude'];


const cryptos = ['bitcoin', 'ether'];

const cryptoList = cryptos.map((symbol) =>
    <li><Symbol value={symbol}/></li>
);

const commodityList = commodities.map((symbol) =>
    <li><Symbol value={symbol}/></li>
);

const indexes = ['wall-street', 'ftse-100'];

const indexList = indexes.map((symbol) =>
    <li><Symbol value={symbol}/></li>
);

const stocksList = stocks.map((symbol) =>
    <li><Stock value={symbol}/></li>
);


// const sentimentTrades = this.state.sentiment_trades_trades.map(trades => {
//
//     return (
//         <tr key={ trades.symbol }>
//
//         </tr>
//     );
// })

class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            mixed: 'Not Set',
            sentiment: 'Not Set',
            mixed_trades: null,
            sentiment_trades: null
        };
    }


    componentDidMount() {
        this.fetchLastPickDates();
    }

    fetchLastPickDates() {


        fetch(API, {
            method: 'get',
        }).then(response => {
            return response.json(); // pass the data as promise to next then block
        }).then(data => {


            this.setState({
                mixed: data.mixed,
                sentiment: data.sentiment
            });

            console.log(encodeURIComponent(data.mixed));

            let fixedDate = this.getFixedDate(data.mixed);
            return fetch(`https://s3.amazonaws.com/mochi-what-to-trade/mixed/${fixedDate}.json`);
        }).then(response => response.json())
            .catch(error => {
                console.log('Request failed', error)
            }).then(r => {

            console.log(`First ${r}`);


            let fixedDate = this.getFixedDate(this.state.sentiment);


            this.setState({
                mixed_trades_dateTime: r.dateTime,
                mixed_trades_trades: r.trades
            });

            return fetch(`https://s3.amazonaws.com/mochi-what-to-trade/sentiment/${fixedDate}.json`);

        }).then(response => response.json())
            .catch(error => {
                console.log('Request failed', error)
            }).then(r => {


            this.setState({
                sentiment_trades_dateTime: r.dateTime,
                sentiment_trades_trades: r.trades
            });


            console.log(`Second: ${JSON.stringify(r)}`); // 2nd request result


        })

    }

    getFixedDate(data) {
        return encodeURIComponent(data.replace('.000', ''));
    }


    render() {
        return (
            <div>
                <div>
                    <h3>Currencies</h3>
                    <ul>
                        {currencyList}
                    </ul>
                    <h3>Commodities</h3>
                    <ul>
                        {commodityList}
                    </ul>
                    <h3>Indexes</h3>
                    <ul>
                        {indexList}
                    </ul>
                    <h3>Crypto currencies</h3>
                    <ul>
                        {cryptoList}
                    </ul>
                    <h3>Stocks</h3>
                    <ul>
                        {stocksList}
                    </ul>
                </div>
                <div>
                    <p>Last Updated</p>


                    <p>mixed: {this.state.mixed}</p>
                    <p>sentiment: {this.state.sentiment}</p>
                </div>


                <div>
                    <h3>Sentiment</h3>
                    <ul>
                        {this.state.sentiment_trades_dateTime}

                    </ul>
                </div>


                <div>
                    <h3>Mixed</h3>
                    <ul>
                        {this.state.mixed_trades_dateTime}

                    </ul>
                </div>

            </div>

        );
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
