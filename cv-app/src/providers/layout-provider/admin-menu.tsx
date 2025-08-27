import { Button, Dropdown, MenuProps } from 'antd';
import Link from 'next/link';
import React from 'react'

function AdminMenu() {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link href='/profile'>Profiili</Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link href='/admin/templates'>Mallit</Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link href='/admin/users'>Käyttäjät</Link>
            ),
        },
    ];
  return (
    <div><Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
        <Button size='small'>Pääkäyttäjä</Button>
      </Dropdown></div>
  )
}

export default AdminMenu