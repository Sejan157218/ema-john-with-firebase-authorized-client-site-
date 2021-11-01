import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../hooks/useAuth';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:9000/orders?email=${user?.email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if (res.status === 401) {
                    history.push('/login');
                }
            })
            .then(data => setOrders(data))
    }, [])

    return (
        <div>
            <h1>My Order item quantity  {orders.length}</h1>
        </div>
    );
};

export default Orders;