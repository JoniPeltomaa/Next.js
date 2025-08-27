import React from 'react'
import { Button, Form, Input } from 'antd'
import { Trash2 } from 'lucide-react'

function Hobbies() {
  return (
    <div>
        <Form.List name='harrastukset'>
            {(fields , {add, remove}) => {
                return <div>
                    <div className="flex gap-5 items-center mb-5">
                        <Button onClick={() => add()} size='small'>Lisää Harrastukset</Button>
                    </div>

                    <div className="flex flex-col gap-5">
                        {fields.map((field, index) => (
                            <div key={field.key || index} className='grid grid-cols-4 gap-5 items-end'>
                                <Form.Item label='Harrastus' name={[field.name, 'harrastus']}>
                                    <Input />
                                </Form.Item>
                                <Button onClick={() => remove(field.name)} className='w-max'>
                                    <Trash2 size={16}/>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            }}
        </Form.List>
    </div>
  )
}

export default Hobbies