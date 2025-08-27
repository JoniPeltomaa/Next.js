import { Form, Input, Upload, Button } from 'antd'
import React from 'react'
import { Trash2 } from 'lucide-react'
import { App } from 'antd';



function Basic({candidatePhoto, setCandidatePhoto,} : {candidatePhoto: any, setCandidatePhoto: any,}) {
    const { message } = App.useApp(); // ✅ tämä on nyt turvallista käyttää
    let selectedFiles: any[] = []
    if (candidatePhoto && typeof candidatePhoto === "object") {
        selectedFiles = [{
            url : URL.createObjectURL(candidatePhoto)
        }]
    }
    if (candidatePhoto && typeof candidatePhoto === "string") {
        selectedFiles = [{
            url: candidatePhoto
        }]
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        <Form.Item label="Nimi" name="Nimi" required>
            <Input />
        </Form.Item>
        <Form.Item label="Sähköposti" name="Sähköposti" required>
            <Input />
        </Form.Item>
        <Form.Item label="Puhelin Numero" name="Puhelin Numero" required>
            <Input />
        </Form.Item>
        <Form.Item label="Verkkosivut" name="verkkosivut">
            <Input />
        </Form.Item>
        <Form.Item label="Linkedin" name="linkedin">
            <Input />
        </Form.Item>
        <Form.Item label="Portfolio" name="portfolio">
            <Input />
        </Form.Item>
        <div className='col-span-4'>
            <Form.Item label="Osoite" name="Osoite" required>
                <Input.TextArea rows={2} />
            </Form.Item>
        </div>
        <Upload listType='picture-card' beforeUpload={(file) => {
            setCandidatePhoto(file)
            return false
        }}
        onRemove={() => setCandidatePhoto("")}
        fileList={selectedFiles}
        >
            <span className='text-sm'>Candidate Photo</span>
        </Upload>
        <div className='col-span-4'>
            <Form.List name="profiilitekstit">
            {(fields, { add, remove }) => (
                <div className="col-span-4 flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <Button onClick={() => add()} size="small">
                    Lisää Profiiliteksti
                    </Button>
                </div>

                {fields.map((field, index) => (
                    <div key={field.key} className="flex gap-4 items-start">
                    <Form.Item
                        label={`Profiili Teksti ${index + 1}`}
                        name={[field.name, "text"]}
                        rules={[{ required: true, message: 'Anna profiiliteksti' }]}
                        className="flex-grow"
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Button
                        onClick={() => remove(field.name)}
                        danger
                        type="text"
                        className="mt-[30px]"
                    >
                        <Trash2 size={16} />
                    </Button>
                    </div>
                ))}
                </div>
            )}
            </Form.List>
        </div>
        <div className='col-span-4'>
            <Form.List name='ammatti'>
                        {(fields , {add, remove}) => {
                            return <div>
                                <div className="flex gap-5 items-center mb-5">
                                    <Button onClick={() => add()} size='small'>Lisää Ammatti</Button>
                                </div>
            
                                <div className="flex flex-col gap-5">
                                    {fields.map((field, index) => (
                                        <div key={field.key || index} className='grid grid-cols-4 gap-5 items-end'>
                                            <Form.Item label='Ammatti' name={[field.name, 'ammatti']}>
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
    </div>
  )
}
export default Basic