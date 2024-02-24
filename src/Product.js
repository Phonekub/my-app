import React,{ useState,useEffect } from "react";
import axios from "axios";
export default function Product(){
    const baseURL="http://127.0.0.1:5000/products";
    const myInputRef1= React.createRef();
    const myInputRef2= React.createRef();
    const [product,setProduct]=useState([])
    useEffect(()=>{
        console.log("request to api")
        axios.get("http://127.0.0.1:5000/products")
        .then(response=>setProduct(response.data))
        .catch(error => {
            console.error('Error fetching data:', error);
          })
    },[])
    const onDeleteProduct=(id)=>{
        console.log(id);
        axios.delete(baseURL+"/api/products"+id).then((response)=>{
            setProduct(response.data);
        });
    }
    
    // const onAddProduct=()=>{
    //     console.log(myInputRef1.current.value);
    //     console.log(myInputRef2.current.value);
    //     const data={
    //         name:myInputRef1.current.value;
    //         price:myInputRef2.current.value;
    //     }

        
    // }

   const show_product = product.map((item)=>{
    return (<tr><td>{item.id}</td><td>{item.name}</td><td>{item.price}</td>
        <td><button onClick>delete</button></td>
        <td><button onClick>ok</button></td>

    </tr>)
   })
    return (<div>       
        <table border='1'>
            <thead>
                <tr>    
                    <td>id</td><td>name</td><td>price</td><td></td>
                </tr>
            </thead>
            <tbody>{show_product}</tbody>
        </table>
            Product name:<input type='text' name='product_name' ref={myInputRef1}/> 
            <br/> Price <input type='text' name='product_price' ref={myInputRef2}/> 
            <button onClick>Add</button>
    </div>)

}