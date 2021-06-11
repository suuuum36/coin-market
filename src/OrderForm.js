import {useState, useEffect} from "react";
import { order } from './Api';
import {Button, TextField} from "@material-ui/core";


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

    return (
        <div>
            <form className="create-order" onSubmit={onOrder}>
                <Button onClick={e=> setSide('buy')}>Buy</Button><Button onClick={e=> setSide('sell')}>Sell</Button>
                <TextField size="small" id="filled-basic" label="price" variant="filled" type="number" onChange={e=> setPrice(e.target.value)}/>
                <TextField size="small" id="filled-basic" label="quantity" variant="filled" type="number" onChange={e=> setQuantity(e.target.value)}/>
                <Button type="submit" variant="contained" color="primary">Order</Button>
            </form>
        </div>
    )
}


export default OrderForm;