import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD, REMOVE } from '../redux/actions/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
const CardsDetails = () => {
  const [data,setData] = useState([]);
  // console.log(data);
  const {id} = useParams();
  // console.log(id);
  const getdata = useSelector((state)=> state.cartreducer.carts);
  // console.log(getdata);
  const dispatch = useDispatch();
  const history = useNavigate();
 const compare = ()=>{
  let comparedata = getdata.filter((e)=>{
    return e.id == id
  });
  setData(comparedata);
 }
 useEffect(()=>{
  compare();
 },[id])
// Add data
 const send=(e)=>{
  dispatch (ADD(e));
 }

 const dlt =(id)=>{
  dispatch(DLT(id));
  history("/");
 }
//  remove data
const remove = (item)=>{
  dispatch(REMOVE(item))
}
  return (
    <>
      <div className="container mt-4">
         <h2 className='text-center fw-bold mt-5 pt-4'>Add Iteams Details</h2>
         <section className='container mt-5'>
          <div className="iteamsdetails">
            {
              data.map((ele)=>{
                return (
                  <>
                   <div className="items_img">
              <img src={ele.imgdata} alt="" />
            </div>
            <div className="details">
             <Table>
              <tr>
                <td>
                  <p><strong>Restaurant</strong> {ele.rname} </p>
                  <p><strong>Price</strong> :Rs.{ele.price} </p>
                  <p><strong>Dishes</strong> :{ele.address}</p>
                  <p><strong>Total</strong> : {ele.price * ele.qnty}</p>
                  <div className="mt-5 d-flex justify-content-between align-items-center" style={{width:100, cursor:"pointer", background:"#ddd", color:"#111"}}>
                  <span style={{fontSize:24}} onClick={ele.qnty <=1 ? ()=>dlt(ele.id) : ()=>remove(ele)}>- </span>
                  <span style={{fontSize:22}}> {ele.qnty}</span>
                  <span style={{fontSize:24}} onClick={()=>send(ele)}> +</span>
                  </div>
                </td>
                <td className="mx-4">
                  <p><strong>Rating :</strong> <span style={{background:'green', color:"white", padding:"2px 5px", borderRadius:"5px"}}>{ele.rating} ★</span></p>
                  <p><strong>Order Review :</strong><span>{ele.somedata}</span></p>
                  <p><strong>Remove</strong> <span><i className='fas fa-trash' onClick={()=>dlt(ele.id)} style={{color:"red", fontSize:"20px", cursor:"pointer"}}></i></span></p>
                </td>
              </tr>
             </Table>
            </div>
                  </>
                )
              })
            }
                
          </div>
         </section>
      </div>
    </>
  )
}

export default CardsDetails
