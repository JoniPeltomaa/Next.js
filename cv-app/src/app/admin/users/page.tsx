import { getAllUsers } from '@/server-actions/users'
import React from 'react'
import UserTable from './_components/users-table';

async function AdminUsers() {
  const response = await getAllUsers();
  if (!response.success) {
    return <div>{response.message}</div>
  }
  return (
    <div>
      <h1 className='text-primary text-lg font-bold uppercase'>Käyttäjät</h1>
      <UserTable data={response.data} />
    </div>
  )
}

export default AdminUsers