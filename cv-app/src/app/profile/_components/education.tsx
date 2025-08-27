'use client';
import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import { Trash2 } from 'lucide-react';

function Education() {
  return (
    <div>
      <Form.List name="koulutus">
        {(fields, { add, remove }) => (
          <>
            <div className="flex gap-5 items-center mb-5">
              <Button onClick={() => add()} size="small">Lisää Koulutus</Button>
            </div>
            <div className="flex flex-col gap-5">
              {fields.map((field) => (
                <div key={field.key} className="grid grid-cols-4 gap-5 items-end">
                  <Form.Item name={[field.name, 'pätevyys']} label="Pätevyys">
                    <Input />
                  </Form.Item>
                  <Form.Item name={[field.name, 'koulu']} label="Koulu">
                    <Input />
                  </Form.Item>
                  <Form.Item name={[field.name, 'alkamisvuosi']} label="Alkamiskuukausi">
                    <DatePicker
                      picker="month"
                      format="MM/YYYY"
                      inputReadOnly
                      className="w-full"
                    />
                  </Form.Item>
                  <Form.Item name={[field.name, 'päättymisvuosi']} label="Päättymiskuukausi">
                    <DatePicker
                      picker="month"
                      format="MM/YYYY"
                      inputReadOnly
                      className="w-full"
                    />
                  </Form.Item>
                  <Button onClick={() => remove(field.name)} className="w-max mt-2" type="default">
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default Education;

