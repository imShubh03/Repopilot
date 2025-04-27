'use client'
import { useUser } from '@clerk/nextjs';
import React from 'react'

const Dashboard = () => {
    const {user } = useUser();
    return (
        <div>dashboard page 
            <p>hello {user?.firstName} {user?.lastName}</p>
        </div>
    )
}

export default Dashboard;