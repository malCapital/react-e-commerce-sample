import React, {useEffect, useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import Table from 'react-bootstrap/Table'
// import MenuItem from '@mui/material/MenuItem';
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT } from '../redux/actions/action';
const Header = () => {
  
  const [price, setPrice] = useState(0);
  console.log(price);
  const getdata = useSelector((state)=> state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

  // cart icon ko handle karne k liye code copy kiya hai mui icon se
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 const dlt =(id)=>{
  dispatch(DLT(id))
 }
//  Total price add
const total = ()=>{
  let price = 0;
  getdata.map((ele,k)=>{
    price = ele.price * ele.qnty + price
  });
  setPrice(price);
};
useEffect(()=>{
  total();
},[total])

  return (
    <>
      <Navbar bg="dark" variant="dark"  className='fixed-top'>
        <Container>
          <Navbar.Brand href="#home">mCapital.Mart</Navbar.Brand>
          <Nav className="me-auto">
          <NavLink to="/" className="text-decoration-none text-light mt-2 mx-2">Add to Cart</NavLink>
            <NavLink to="/" className="text-decoration-none text-light mt-2 mx-2">Home</NavLink>
          </Nav>
          <Badge badgeContent={getdata.length} color="primary" style={{paddingTop:'3px'}}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          <i className="fa-solid fa-cart-shopping text-light" style={{fontSize:28, cursor:'pointer'}}></i>
          </Badge>
        </Container>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          getdata.length ?
          <div className='card_details' style={{width:"24rem", padding:10}}>
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Resturant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    getdata.map((e)=>{
                      return(
                        <>
                        <tr>
                          <td>
                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                            <img src={e.imgdata} alt="imgdata" style={{width:"5rem", height:"5rem"}} />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price: Rs.{e.price}</p>
                            <p>Quantity: {e.qnty}</p>
                            <p style={{color:"red", fontSize:20, cursor:"pointer"}} onClick={()=>dlt(e.id)}> <i className="fas fa-trash smalltrash"></i></p>
                          </td>
                          <td className='mt-5' style={{color:"red", fontSize:20, cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                          <i className="fas fa-trash largetrash"></i>
                          </td>
                        </tr>
                        </>
                      )
                    })
                  }
                  <p className='text-center'> <span className='fw-bold'>Total:</span> Rs.{price}</p>
                </tbody>
              </Table>
          </div>:
          <div className="card_details d-flex justify-content-center align-items-center" style={{width:"24rem",position:"relative", padding:10}}>
          <i className='fas fa-close smallclose' onClick={handleClose} style={{position:"absolute", top:2, right:20, fontSize:23, cursor:"pointer"}}></i>
          <p style={{fontSize:22}}>Your cart is empty!</p>
          <img src="./images/cart.gif" alt="" className='emptycart_img' style={{width:"5rem", padding:10}}/>
        </div>
        }
      </Menu>
      </Navbar>
    </>
  )
}

export default Header;

