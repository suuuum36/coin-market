import logo from './logo.svg';
import './App.css';
import {Button, ButtonGroup, TextField} from '@material-ui/core';
import {useEffect, useState} from 'react';
import { loadMarket, loadMarkets } from './Api';
import LoginForm from "./LoginForm";
import Assets from "./Assets";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
    const [user, setUser] = useState(null);
    const [markets, setMarkets] = useState([]);
    const [market, setMarket] = useState(null);

    const defaultMarket = 'snu-won';
    console.log(markets)
    if(market) console.log(market)
    useEffect(() => {
        loadMarkets()
            .then(marketObjects => {
                setMarkets(Object.keys(marketObjects).map(key => marketObjects[key]));
            })
    }, []);

    useEffect(() => {
        loadMarket(defaultMarket)
            .then(_market => {
                setMarket(_market);
            })
    }, []);

    
    const loginComplete = (name) => {
        console.log(name);
        setUser(
            {name: name}
        );
    };

    const logout = () => {
        window.location.href = '/';
        localStorage.clear();
        setTimeout = (() => 
            setUser( {name: null} )
        ,1);
    }


    return (
    <div>
        <header>

        <div><h2>logo</h2></div>
        <h2>Snu-Coin</h2>
        <div className="login-panel">

            {user ? <span> Welcome! {user.name} <Button onClick={logout}>로그아웃</Button></span>
            :
                <div>
                    <LoginForm loginComplete ={loginComplete}/>
                    <div className="assets">
                        <Assets/>
                    </div>

                </div>
            }
        </div>
        </header>
        <div id="contents">
            <div className="market">
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    {markets.map(market =>

                        <Button>{market.name}</Button>
                    )}
                </ButtonGroup>
                {market &&
                <div className="market">
                    <div id="orderBooks">
                        {
                            market.orderBook.buy.map(orderBook => {
                                return (<div key={orderBook._id}>
                                    {orderBook._id} : {orderBook.totalQuantity}
                                </div>);
                            })
                        }
                    </div>
                    <div >
                        <form className="create-order">
                            <Button>Buy</Button><Button>Sell</Button>
                            <TextField size="small" id="filled-basic" label="price" variant="filled" type="number" />
                            <TextField size="small" id="filled-basic" label="quantity" variant="filled" type="number" />
                            <Button type="submit">Order</Button>
                        </form>
                    </div>
                </div>
                }

            </div>

        </div>

    </div>
    );

    }

export default App;
