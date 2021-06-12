import {useState, useEffect} from "react";
import { order } from './Api';
import {Button, TextField} from "@material-ui/core";
import './App.css';


const OrderForm = (props) => {
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [side, setSide] = useState(null);
    let marketName = props.marketName;

    const onOrder = async (e) => {
        e.preventDefault();
        if (localStorage.getItem('LOGIN_KEY')) {
            const response = await order(price, quantity, props.marketName, side);
        }
    }

    let sideText; 
    if(side=='buy') {
        sideText = '매수'
    } else if (side=='sell') {
        sideText = '매도'
    } else {
        sideText = ''
    }

    return (
        <div className="orderDiv">
            <form className="create-order" onSubmit={onOrder}>
                <div className="buy-sell">
                    <Button className="buy-sell-button" onClick={e=> setSide('buy')}>Buy</Button>
                    <Button className="buy-sell-button"onClick={e=> setSide('sell')}>Sell</Button>
                </div>
                <div className="side">{sideText}</div>
                <TextField size="small" id="filled-basic" label="price" variant="filled" type="number" onChange={e=> setPrice(e.target.value)}/>
                <TextField size="small" id="filled-basic" label="quantity" variant="filled" type="number" onChange={e=> setQuantity(e.target.value)}/>
                <Button type="submit" variant="contained" color="primary">Order</Button>
            </form>
        </div>
    )
}


export default OrderForm;