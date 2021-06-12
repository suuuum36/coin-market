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

    return (
        <div> {orders.map(order=> 
            <div className="load-orders">
                <div showStatus = {showStatus(order.status)} >체결상태 : {statusText} </div>
                <div>시장: {order.market.name}</div>
                <div>체결액 : {order.price}</div>
                <div>체결량: {order.quantity}</div>
                {order.status == 0 ? <button className={order._id} onClick={e=> DeleteOrder(e.target.className)}>주문취소</button> : ''}
            </div>
            )}
        </div>
    )
    
}

export default LoadOrder;