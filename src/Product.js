import  "./App.css";
import React, { useEffect, useState } from "react";

const url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products";
const filter = ["Expired", "Low Stock"];

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [filterItem, setFilterItem] = useState(filter);
  const [filterOut,setFilterOut]=useState([])
  const currentDate = new Date();

  const fetchProductApi = async (APIurl) => {
    const response = await fetch(APIurl);
    const data = await response.json();
    setProductData(data);
  };

  useEffect(() => {
    fetchProductApi(url);
  }, []);

  function handleCheckboxChange(e) {
    const { name, checked } = e.target;
    if (checked) {
      setFilterItem((prevItems) => [...prevItems, name]);
      setFilterOut((prevItems) => prevItems.filter((item) => item !== name));
    } else {
      setFilterItem((prevItems) => prevItems.filter((item) => item !== name));
      setFilterOut([...filterOut,name])
    }
  }

  let filteredData = [];

  
  if (filterOut.includes("Expired") && filterOut.includes("Low Stock")) {
    filteredData = productData.filter(product => {
        const expiryDate = new Date(product.expiryDate);
        return (expiryDate < currentDate) || (product.stock < 100);
      });
  }else  if (filterOut.includes("Expired")) {
    filteredData = productData.filter((product) => {
      const expiryDate = new Date(product.expiryDate);
      return (expiryDate < currentDate);
    })
  } else if (filterOut.includes("Low Stock")) {
    filteredData = productData.filter((product) => product.stock < 100);
  }
  

  const filterId=filteredData.map((eachProduct)=>{
    return eachProduct.id
  })

  const finalFilter=productData.filter((product)=> !filterId.includes(product.id))

  console.log(filterId);
console.log("filteredData"+filteredData);
  console.log("finalFilter"+finalFilter);
  return (
    <>
      <main>
        <h1>Products</h1>
      <div className="or-po-page">  
      <div className="or-po-filter">
        <h3>Filters</h3>
      <div className="or-po-input">
      <p>Count: {finalFilter.length}</p>
      {
        filter.map((eachItem)=>{
            return <label  key={eachItem}>
            <input
              type="checkbox"
              name={eachItem}
              checked={filterItem.includes(eachItem)}
              onChange={handleCheckboxChange}
            />
            {eachItem}
          </label>
        })
      }
      </div>
      </div>
      <div className="tablediv">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Product Brand</th>
            <th>Expiry Date</th>
            <th>Unit Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody className="tablebody">
          {finalFilter.map((product) => (
            <tr key={product.id}>
              <td style={{color:"#8c8c8c"}}>{product.id}</td>
              <td>{product.medicineName}</td>
              <td style={{color:"#8c8c8c"}}>{product.medicineBrand}</td>
              <td>{product.expiryDate}</td>
              <td style={{color:"#8c8c8c"}}>{product.unitPrice}</td>
              <td style={{color:"#8c8c8c"}}>{product.stock}</td>
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

export default Product;
