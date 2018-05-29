import React from 'react';
import ReactDOM from 'react-dom';

function Symbol(props) {
    return <li><a href={`https://s3.amazonaws.com/sentiment-plots/current/${props.value}.png`}>{props.value}</a></li>
}

const API = 'https://sc44xmc00k.execute-api.us-east-1.amazonaws.com/Prod/ReadCurrentPicks';
const currencies = ['aud-usd', 'eur-gbp', 'eur-jpy', 'eur-usd', 'gbp-usd', 'nzd-usd', 'usd-cad', 'usd-jpy'];

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

class App extends React.Component {


    componentDidMount() {
        console.log('Reading picks');
        fetch(API)
            .then(response => response.json())
            .then(data => this.setState({hits: data.hits}));
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
                </div>
                <div>
                    <p>state</p>
                    <p>{this.state}</p>
                </div>
            </div>

        );
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
