import  "./App.css";
import React, { useEffect, useState } from "react";

const url="https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users"
function Users() {
    const[userData,setUserData]=useState([])
    const[searchItem,setSearchItem]=useState("")
    const[useUrl,setUseUrl]=useState(url)

    const fetchUserApi=async(ApiUrl)=>{
       try {
        const response=await fetch(ApiUrl);
        const data= await response.json()
        
        if(!response.ok){
            throw new Error("not found")
        }
        setUserData(data)
       } catch (error) {
        alert("User Not Found")
       }
    }

    function handleEvent(event){
        if(event.key==="Enter"){
           
            if (searchItem.length<2){
                alert("Please enter atleast 2 characters")
            }else{
            setUseUrl(`${url}?fullName=${searchItem}`)
            }
        }

    }

    useEffect(()=>{
        fetchUserApi(useUrl)
    },[useUrl])

    useEffect(()=>{

        window.addEventListener("keydown",handleEvent)

        return(()=>{
            window.removeEventListener("keydown", handleEvent)
        })

    },[searchItem])

    function handleSearch(e){
        setSearchItem(e.target.value)
    }

    return(
        <>
        <main>
        <h1>Users</h1>
        <div className="userdiv">
        <div className="userSearch">
            <input type="text" name="search" id="search" placeholder="Search By Name" value={searchItem}
            onChange={handleSearch}/>
            <button onClick={()=>{setSearchItem(""); setUseUrl(url)}}>Reset</button>
        </div>
        <div className="tablediv">
        <table className="table">
            <thead className="tablebody">
                <tr>
                <th>ID</th>
                <th>User Avatar</th>
                <th>Full Name</th>
                <th>DoB</th>
                <th>Gender</th>
                <th>Current Location</th>
                </tr>
            </thead>
            <tbody>
                {
                    userData.map((eachUser)=>{
                      return  <tr key={eachUser.id}>
                            <td style={{color:"#8c8c8c"}}>{eachUser.id}</td>
                            <td><img src={eachUser.profilePic} alt={eachUser.id}/></td>
                            <td style={{color:"#8c8c8c"}}>{eachUser.fullName}</td>
                            <td>{eachUser.dob}</td>
                            <td style={{color:"#8c8c8c"}}>{eachUser.gender}</td>
                            <td style={{color:"#8c8c8c"}}>{eachUser.currentCity},{eachUser.currentCountry}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        </div>
        </div>
        </main>
        </>
    )
}

export default Users