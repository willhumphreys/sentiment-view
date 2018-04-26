import React from 'react';
import ReactDOM from 'react-dom';

function Symbol(props) {
    return <li><a href={`https://s3.amazonaws.com/sentiment-plots/2018-04-24_04%3A04%3A32/${props.value}.png`}>{props.value}</a></li>
}

function App() {

    const currencies = ['aud-usd', 'eur-gbp', 'eur-jpy', 'eur-usd', 'gbp-usd', ,'nzd-usd', 'usd-cad', 'usd-jpy' ];

    const currencyList = currencies.map((symbol) =>
    <li><Symbol value={symbol}/></li>
    );
    
    const commodities = ['gold', 'silver'];

    const commodityList = commodities.map((symbol) =>
    <li><Symbol value={symbol}/></li>
    );

    const indexes = ['wall-street'];

    const indexList = indexes.map((symbol) =>
    <li><Symbol value={symbol}/></li>
    );

   
    return (
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
        </div>
    );
}




ReactDOM.render(
    <App />,
    document.getElementById('root')
);
