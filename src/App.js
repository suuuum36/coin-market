import logo from './logo.svg';
import './App.css';
import {Button, ButtonGroup, TextField} from '@material-ui/core';
import {useEffect, useState} from 'react';
import { loadMarket, loadMarkets, loadOrder, order} from './Api';
import LoginForm from "./LoginForm";
import OrderForm from "./OrderForm";
import Assets from "./Assets";
import { render } from '@testing-library/react';

function App() {
    const [user, setUser] = useState(null);
    const [markets, setMarkets] = useState([]);
    const [market, setMarket] = useState(null);
    const [orders, setOrder] = useState([]);

    let defaultMarket = 'snu-won';
    const SnuWon = 'snu-won';
    const UnsWon = 'uns-won';
    const SnuUns = 'snu-uns';

    console.log(markets)
    if(market) console.log(market.market.name)

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

    useEffect(() => {
        loadOrder()
            .then(orderObjects => {
                setOrder(Object.keys(orderObjects).map(key => orderObjects[key]));
            })
            console.log(orders);
    }, []);


    function ShowOrderBook1 () {
        loadMarket(SnuWon)
            .then(_market => {
                setMarket(_market);
            })
        
    }

    function ShowOrderBook2 () {
        loadMarket(UnsWon)
            .then(_market => {
                setMarket(_market);
            })
    }

    function ShowOrderBook3 () {
        loadMarket(SnuUns)
            .then(_market => {
                setMarket(_market);
            })
    }
    
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


    let Welcome;
    let AccountShow;
    let AssetsShow;
    let MakeOrder;
    let LoadOrder;


    if(user != null) {
        Welcome = <span> Welcome! {user.name} </span>
        AccountShow = <Button onClick={logout}>로그아웃</Button>
        AssetsShow = <Assets/>
        MakeOrder = <OrderForm marketName={market.market.name}/>
        LoadOrder = <div> {orders.map(order=> 
                            <div className="load-orders">
                                <div>체결상태 : {order.status}</div>
                                <div>시장: {order.market.name}</div>
                                <div>체결액 : {order.price}</div>
                                <div>체결량: {order.quantity}</div>
                            </div>
                            )}
                    </div>

        } else {
            Welcome = ''
            AccountShow = <LoginForm loginComplete ={loginComplete}/>
            AssetsShow = ''
            MakeOrder = <OrderForm />
        }

    return (
    <body>
        <header>
        <div><h2>logo</h2></div>
        <h2>Snu-Coin</h2>
        <div className="login-panel">
        
            {Welcome}
            {AccountShow}
            {AssetsShow}
            {MakeOrder}
            {LoadOrder}

        </div>
        </header>
        <div id="contents">
            <div className="market">
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    {/* {markets.map(market =>
                        <Button>{market.name}</Button>
                    )} */}
                    <Button onClick = {ShowOrderBook1}>SNU-WON</Button>
                    <Button onClick = {ShowOrderBook2}>UNS-WON</Button>
                    <Button onClick = {ShowOrderBook3}>SNU-UNS</Button>
                </ButtonGroup>

                {market &&
                <div className="market">
                    <div>
                        <div id="orderBooks">
                            {
                                market.orderBook.buy.map(orderBook => {
                                    return (
                                        <div key={orderBook._id}>
                                            {orderBook._id} : 
                                            {orderBook.totalQuantity} :
                                            매수
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div id="orderBooks">
                            {
                                market.orderBook.sell.map(orderBook => {
                                    return (
                                        <div key={orderBook._id}> 
                                            {orderBook._id} : 
                                            {orderBook.totalQuantity} :
                                            매도
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                }

            </div>

        </div>

    </body>
    );

    }

export default App;
