import { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/navbar";
import './home.css'
import axios from 'axios';

const url = 'http://localhost:5000/stocks'

function Home() {
    const [stockprice, setStockprice] = useState("Select stock");
    let [stock, setdata] = useState([]);
    const [updateNum, setUpdateNum] = useState(0)
    let useref = useRef("nocomp")
    let interval;
    useEffect(() => {
        async function rtstocks(com) {
            let res = await axios.put(url);
            setdata(res.data);
            console.log(com)
            if (com == undefined || com == "nocomp") {
                setStockprice(res.data[0].price);
                setUpdateNum(res.data[0].num);
            }
            else {
                let comp = res.data.filter((val, idx) => {
                    return val.company === com
                })
                if (comp[0] !== undefined) {
                    setStockprice(comp[0].price);
                    setUpdateNum(comp[0].num);
                }
            }
        }
        rtstocks()
        interval = setInterval(() => {
            let comp = useref.current;
            rtstocks(comp);
        }, 60000);
        return () => clearInterval(interval);
    }, [])

    function selectedStock(e) {
        useref.current = e.target.value
        for (let i = 0; i < stock.length; i++) {
            if (stock[i].company === e.target.value) {
                console.log(stock[i].price)
                setStockprice(stock[i].price.toFixed(2));
                setUpdateNum(stock[i].num)
                break
            }
        }
        clearInterval(interval)

    }

    return (
        <div className="maincont">
            <Navbar />
            <div className="stockcs-cont">
                <div id="stockName">
                    <label> Choose Stocks :</label>
                    <select onChange={selectedStock}>
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
                    <input type="text" readOnly="true" value={stock.length === 0 ? "Select stock" : stockprice} />

                </div>
            </div>
        </div>
    )
}

export default Home;