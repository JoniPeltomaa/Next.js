import React from 'react'
import { Button, Form, Input } from 'antd'
import { Trash2 } from 'lucide-react'

function Referrer() {
  return (
    <div>
        <Form.List name='suosittelija'>
            {(fields , {add, remove}) => {
                return <div>
                    <div className="flex gap-5 items-center mb-5">
                        <Button onClick={() => add()} size='small'>Lisää Suosittelija</Button>
                    </div>

                    <div className="flex flex-col gap-5">
                        {fields.map((field, index) => (
                            <div key={field.key || index} className='grid grid-cols-2 gap-5 items-end'>
                                <Form.Item label='Nimi' name={[field.name, 'nimi']}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label='Titteli ja organisaatio' name={[field.name, 'titteli ja organisaatio']}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label='Työsuhde sinuun' name={[field.name, 'työsuhde sinuun']}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label='Sähköposti' name={[field.name, 'sähköposti']}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label='Puhelinnumero' name={[field.name, 'puhelinnumero']}>
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

export default Referrer