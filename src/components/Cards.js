import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import Cardsdata from './CardsData';
import { ADD } from '../redux/actions/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
const Cards = () => {

  const [data, setData] = useState(Cardsdata);

  const dispatch = useDispatch();

  const send=(e)=>{
   dispatch (ADD(e));
   toast("Item has been added to cart",{
    position:"top-center",
    autoClose: 1000
   })
  }
  return (
    <div className="container mt-3">
      <h2 className='text-center fw-bold mt-5 pt-5'>Welcome to mCapital Mart</h2>
    <p className="text-center mt-2">Add to Cart which item you want <i className="fa-sharp fa-solid fa-face-smile"></i></p>
    <div className='row d-flex justify-content-center align-items-center'>
     {
      data.map((element, id)=>{
        return(
          <>
           <Card style={{ width: '22rem', border:"none" }} className="mx-2 mt-4 card_style">
           <Card.Img variant="top" src={element.imgdata} style={{height: "16rem"}} className="mt-3"/>
           <Card.Body>
            <Card.Title className='fw-bold'>{element.rname}</Card.Title>
            <Card.Text>  <span className='fw-bold'>Price:</span> Rs.{element.price} </Card.Text>
            <div className="button_div d-flex justify-content-center">
            <Button variant="success" onClick={()=>send(element)} className="col-lg-12 col-md-6 mx-auto">Add to Cart</Button>
              </div>
          </Card.Body>
          </Card>
          </>
        )
      })
     }
    </div>
    <ToastContainer/>
    </div>
  )
}

export default Cards
