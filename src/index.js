import React from 'react';
import ReactDOM from 'react-dom';

function Symbol(props) {
    return <li><a href={`https://s3.amazonaws.com/sentiment-plots/current/${props.value}.png`}>{props.value}</a></li>
}

const API = 'https://hi8hj4u1y1.execute-api.us-east-1.amazonaws.com/prod/currentpicks';
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


    constructor(props) {
        super(props);
        this.state = {
            mixed: 'Not Set',
            sentiment: 'Not Set'
        };
    }




    componentDidMount() {
        console.log('Reading picks');
        fetch(API)
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                console.log(json);
                console.log(json.mixed);
                console.log(json.sentiment);

                this.setState({
                    mixed: json.mixed,
                    sentiment: json.sentiment
                });

            });
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
                    <p>Last Updated</p>



                    <p>mixed: {this.state.mixed}</p>
                    <p>sentiment: {this.state.sentiment}</p>
                </div>
            </div>

        );
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
