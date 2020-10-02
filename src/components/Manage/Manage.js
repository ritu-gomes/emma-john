import React from 'react';

const Manage = () => {
    const add = {};
    const handleAdd = () => {
        fetch('http://localhost:5000/addProduct',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(add)
        })
    }
    return (
        <div>
            <form action="">
                <p><input type="text"/></p>
                <p><input type="text"/></p>
                <p><input type="text"/></p>
                <p><input type="text"/></p>
                <button onClick={handleAdd()}>add product</button>  
            </form>
        </div>
    );
};

export default Manage;