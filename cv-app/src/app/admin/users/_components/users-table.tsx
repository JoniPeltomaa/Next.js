'use client'
import { IUser } from '@/interfaces'
import { Table } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

function UserTable({data} : {data : IUser[]}) {
    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
        },
        {
            title: "Nimi",
            dataIndex: "name",
        },
        {
            title: "Sähköposti",
            dataIndex: "email"
        },
        {
            title: "Is Admin",
            dataIndex: "isAdmin",
            render : (isAdmin : any) => isAdmin ? "Kyllä" : "Ei",
        },
        {
            title: "Luotu",
            dataIndex: "createdAt",
            render: (createAt: any) => dayjs(createAt).format("MMM DD, YYYY hh:mm A"),
        },
    ]
  return (
    <div>
        <Table columns={columns} dataSource={data} rowKey="_id" />
    </div>
  )
}

export default UserTable