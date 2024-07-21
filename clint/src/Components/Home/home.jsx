import { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";
import './home.css'
import axios from 'axios';

const url = 'http://localhost:5000/stocks'

function Home() {
    const [stockprice, setStockprice] = useState("Select stock");
    const [stockname, setStockname] = useState("Stocks");
    let [stock, setdata] = useState([]);
    const [updateNum, setUpdateNum] = useState(0)

    function getdata() {
        var interval = setInterval(doStuff, 60000);
        async function doStuff() {
            let res = await axios.put(url);
            setdata(res.data)

        }
    }

    useEffect(() => {
        getdata()
        if (stock.length > 5) {
            let price = stock.filter((ele) => {
                return ele.company === company
            })
            if (price != undefined) {
                console.log(price, "error")
                setStockprice(price[0].price);
                setUpdateNum(price[0].num)

            }

        }

    }, [stock])
    const [company, setCompany] = useState('3M')
    function selectedStock(e) {
        setCompany(e.target.value);

    }

    return (
        <div className="maincont">
            <Navbar />
            <div className="stockcs-cont">
                <div id="stockName">
                    <label> Choose Stocks :</label>
                    <select onChange={(e) => { selectedStock(e) }}>
                        {stock?.map((val, idx) => {
                            return (<>
                                <option value={val.company}>{val.company}</option>
                            </>
                            )
                        })}
                    </select>
                </div>
                <div id="stockName">
                    <label> Current Price :</label><span style={{ color: `${updateNum < 0 ? "red" : "green"}` }} > {updateNum < 0 ? updateNum : "+" + updateNum} </span>
                    <input type="text" readOnly="true" value={stockprice} />

                </div>
            </div>
        </div>
    )
}

export default Home;