import {Button, TextField} from "@material-ui/core";
import {useEffect, useState} from 'react';
import { loadOrder, deleteOrder} from './Api';

const LoadOrder = () => {
    const [orders, setOrder] = useState([]);
    let orderStatus;
    let orderDelete;

    useEffect(()=> {
        loadOrder()
            .then(orderObjects => {
                    setOrder(Object.keys(orderObjects).map(key => orderObjects[key]));
                })
    }, [])

    return (
        <div> {orders.map(order=> 
            <div className="load-orders">
                <div>체결상태 : {order.status == 1 ? '체결완료' : '미체결'}</div>
                <div>시장: {order.market.name}</div>
                <div>체결액 : {order.price}</div>
                <div>체결량: {order.quantity}</div>
                {order.status == 1 ?  '' : <Button>주문취소</Button>}
            </div>
            )}
        </div>
    )
    
}

export default LoadOrder;