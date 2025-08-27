'use client';
import React from 'react';
import { Button, Form, Input, DatePicker } from 'antd';
import { Trash2 } from 'lucide-react';

function Experience() {
  return (
    <div>
      <Form.List name="työpaikat">
        {(fields, { add, remove }) => (
          <>
            <div className="flex gap-5 items-center mb-5">
              <Button onClick={() => add()} size="small">Lisää Työpaikka</Button>
            </div>

            <div className="flex flex-col gap-10">
              {fields.map((field) => (
                <div key={field.key} className="grid grid-cols-4 gap-5 items-end p-5 border border-solid border-primary">
                  {/* Työnimike */}
                  <Form.Item name={[field.name, 'työnimike']} label="Työnimike">
                    <Input />
                  </Form.Item>

                  {/* Organisaatio */}
                  <Form.Item name={[field.name, 'organisaatio']} label="Organisaatio">
                    <Input />
                  </Form.Item>

                  {/* Alkamispäivä */}
                  <Form.Item name={[field.name, 'alkamispäivä']} label="Alkamiskuukausi">
                    <DatePicker
                      picker="month"
                      format="MM/YYYY"
                      inputReadOnly
                      className="w-full"
                    />
                  </Form.Item>

                  {/* Päättymispäivä */}
                  <Form.Item name={[field.name, 'päättymispäivä']} label="Päättymiskuukausi">
                    <DatePicker
                      picker="month"
                      format="MM/YYYY"
                      inputReadOnly
                      className="w-full"
                    />
                  </Form.Item>

                  {/* Kuvaus + Poista-nappi */}
                  <div className="col-span-4 flex gap-5 items-end">
                    <Form.Item name={[field.name, 'työtehtäväkuvaus']} label="Työtehtäväkuvaus" className="flex-1">
                      <Input.TextArea />
                    </Form.Item>
                    <Button onClick={() => remove(field.name)} className="w-max">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default Experience;

