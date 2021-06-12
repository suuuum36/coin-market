import {useState, useEffect} from "react";
import { loadAssets } from './Api';
import './App.css';

const Assets = () => {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        loadAssets()
        .then(_assets => {
            setAssets(_assets)
        })
    }, []);

    return (
        <div>
            <div className="my-asset">내 자산 확인하기</div>
            {
                assets.map(asset => {
                    return (<div>
                        {asset.symbol} : {asset.quantity}
                    </div>)
                })
            }
        </div>
    )
}

export default Assets;
