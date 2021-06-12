import {Button, TextField} from "@material-ui/core";
import {useEffect, useState} from 'react';
import { loadOrder, deleteOrder} from './Api';
import './App.css';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


//delete 수정중

const LoadOrder = () => {
    const [orders, setOrder] = useState([]);
    const [marketName, setMarketName] = useState('snu-won uns-won snu-uns');

    let orderStatus;
    let orderDelete;

    useEffect(()=> {
        loadOrder()
            .then(orderObjects => {
                    setOrder(Object.keys(orderObjects).map(key => orderObjects[key]));
                })
    }, [])

    const DeleteOrder = async (e) => {
        console.log(e);
        if(window.confirm("주문을 취소하시겠습니까?")) {
            const res = await deleteOrder(e);
        }
    }

    let statusText;
    const showStatus = (status) => {
        if(status ==1) {
            statusText = '체결완료'
        } else if(status ==0) {
            statusText = '미체결'
        } else if (status==-1) {
            statusText = '주문취소'
        }
    }

    
let ordersDiv;

const MarketChange = (e) => {
    console.log(e);
    setMarketName(e);
};

const filterObject = orders.filter((order)=> 
    marketName.includes(order.market.name)
)

let orderList = [];
const showObject = filterObject.map((order) => {
    orderList.push(
    <div className="load-orders"> 
        <div showStatus = {showStatus(order.status)} >체결상태 : {statusText} </div>
        <div>시장: {order.market.name}</div>
        <div>체결액 : {order.price}</div>
        <div>체결량: {order.quantity}</div>
        {order.status == 0 ? <button className={order._id} onClick={e=> DeleteOrder(e.target.className)}>주문취소</button> : false}
    </div>
    )
    
    })

console.log(orderList);

    return (
        <div>
            <div className="my-order"> 내 주문 확인하기 </div>
            <div className="selectMarket">
                <input type = "radio" value="snu-won uns-won snu-uns" onClick={e=> MarketChange(e.target.value)} name = "market" defaultChecked/> 모두보기
                <input type="radio" value="snu-won" onClick={e=> MarketChange(e.target.value)} name = "market"/> SNU-WON
                <input type="radio" value="uns-won" onClick={e=> MarketChange(e.target.value)} name = "market"/> UNS-WON
                <input type="radio" value="snu-uns" onClick={e=> MarketChange(e.target.value)} name = "market"/> SNU-UNS
            </div>

            {orderList}
        </div>
    )
    
}

export default LoadOrder;