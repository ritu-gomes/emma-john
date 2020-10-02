import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser,setLoggedInUser] = useContext(userContext);
    const onSubmit = data => {
      const orderCart = getDatabaseCart();
      const orderInfo = {...loggedInUser, products: orderCart, data: data};
      fetch("http://localhost:5000/addOrders", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderInfo) 
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          processOrder();
          alert('order has been placed')
        }
      })
    }

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue={loggedInUser.displayName} placeholder="your name" ref={register({ required: true })} />
          {errors.name && <span className="error">name is required</span>}  
          
          <input name="email" defaultValue={loggedInUser.email} placeholder="your email" ref={register({ required: true })} />
          {errors.email && <span className="error">email is required</span>}  
          
          <input name="address" placeholder="your address" ref={register({ required: true })} />
          {errors.address && <span className="error">This field is required</span>}  
          <input type="submit" />
        </form>
      );
};

export default Shipment;