import React,{ useState,useEffect } from "react";
import axios from "axios";
export default function Product(){
    const myInputRef1= React.createRef();
    const myInputRef2= React.createRef();
    const myInputRef3= React.createRef();
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
        axios.delete("http://127.0.0.1:5000/products/"+id).then((response)=>{
            setProduct(response.data);
        });
    }
    const onOkClick=(id)=>{
        console.log(myInputRef1.current.value);
        console.log(myInputRef2.current.value);
        console.log(myInputRef3.current.value);

        const data={
            name:myInputRef1.current.value,
            price:myInputRef2.current.value,
            id:myInputRef3.current.value

        }
        axios.put("http://127.0.0.1:5000/products/"+id,data).then((response)=>{
            setProduct(response.data);
        })
    }
    const onAddProduct=()=>{
        console.log(myInputRef1.current.value);
        console.log(myInputRef2.current.value);
        console.log(myInputRef3.current.value);
        const data={
            name:myInputRef1.current.value,
            price:myInputRef2.current.value,
            id:myInputRef3.current.value
        }
        axios.post("http://127.0.0.1:5000/products",data).then((response)=>{
            setProduct(response.data);
        })

        
    }
   const show_products = product.map((item)=>{
    return (<tr key={item.id}><td>{item.id}</td><td>{item.name}</td><td>{item.price}</td>
        <td><button onClick={onDeleteProduct.bind(this,item.id)}>delete</button></td>
        <td><button onClick={onOkClick.bind(this,item.id)}>ok</button></td>

    </tr>)
   })
    return (<div>
        <table border='1'><thead><tr><td>id</td><td>name</td><td>price</td><td></td></tr></thead>
        <tbody>{show_products}</tbody>
        </table>
        Product ID: <input type="text" name ='product_id' ref={myInputRef3}/>(ถ้าจะaddให้ใส่เลขใหม่ แต่ถ้าต้องการแก้ให้ใส่idที่อยู่ในตารางที่ต้องการแก้ไข้แล้วกดok)
        <br/>
        Product name : <input type="text" name ='product_name' ref={myInputRef1}/>
        <br/>
        Price : <input type="text" name ='product_price' ref={myInputRef2}/>
        <br/>
        <button onClick={onAddProduct.bind(this)}>Add</button>
        </div>);

}