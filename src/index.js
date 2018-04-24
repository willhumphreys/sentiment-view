import React from 'react';
import ReactDOM from 'react-dom';

function Symbol(props) {
    return <li><a href={props.url}>{props.name}</a></li>

}

function App() {
    return (
        <div>
            <ul>
                <Symbol url="https://s3.amazonaws.com/sentiment-plots/2018-04-24_04%3A04%3A32/aud-usd.png" name="aud-usd" />
                <Symbol url="https://s3.amazonaws.com/sentiment-plots/2018-04-24_04%3A04%3A32/eur-gbp.png" name="eur-gbp" />
            </ul>
        </div>
    );
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
