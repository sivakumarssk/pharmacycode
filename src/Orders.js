import  "./App.css";
import React, { useEffect, useState } from "react";

const url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders";
const status=["New", "Packed", "InTransit", "Delivered"]

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const [filterItems, setFilterItems] = useState(status);
  const[error,setError]=useState({status:false,msg:""})

  const fetchOrderAPI = async (APIurl) => {
    setError({status:false,msg:""})
    try {
      const response = await fetch(APIurl);
      const data = await response.json();
      setError({status:false,msg:""})
      if(!data){
        throw new Error("data not found")
    }
      setOrderData(data);
    } catch (error) {
      setError({status:true,msg:error.message || "something eant wrong"})
    }
  };

  useEffect(() => {
    fetchOrderAPI(url);
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFilterItems((prevItems) => [...prevItems, name]);
    } else {
      setFilterItems((prevItems) => prevItems.filter((item) => item !== name));
    }
  };

  console.log(filterItems);
  
  const filteredData = orderData.filter((order) => filterItems.includes(order.orderStatus));

  return (
    <>
    <main>
      <h1>Orders</h1>
      <div className="or-po-page">
      <div className="or-po-filter">
      <h3>Filters</h3>
      <div className="or-po-input">
        <p>Count: {filteredData.length}</p>
          {status.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  name={item}
                  checked={filterItems.includes(item)}
                  onChange={handleCheckboxChange}
                />
                {item}
              </label>
          ))}
      </div>
      </div>
      <div className="tablediv">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody className="tablebody">
          {!error?.status &&
          filteredData.map((order) => (
            <tr key={order.id}>
              <td style={{color:"#8c8c8c"}}>{order.id}</td>
              <td>{order.customerName}</td>
              <td><div>{order.orderDate}</div><div style={{color:"#8c8c8c"}}>{order.orderTime}</div></td>
              <td style={{color:"#8c8c8c"}}>{order.amount}</td>
              <td>{order.orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      </main>
    </>
  );
};

export default Order;
