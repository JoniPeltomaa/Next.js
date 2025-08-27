'use client';
import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import { Trash2 } from 'lucide-react';

function Projects() {
  return (
    <div>
      <Form.List name="projektit">
        {(fields, { add, remove }) => (
          <>
            <div className="flex gap-5 items-center mb-5">
              <Button onClick={() => add()} size="small">Lisää Projekti</Button>
            </div>
            <div className="flex flex-col gap-5">
              {fields.map((field) => (
                <div key={field.key} className="grid grid-cols-4 gap-5 items-end">
                  <Form.Item name={[field.name, 'projektinimi']} label="Projektin Nimi">
                    <Input />
                  </Form.Item>
                  <Form.Item name={[field.name, 'roolivastuualue']} label="Rooli / Vastuualue">
                    <Input />
                  </Form.Item>
                  <Form.Item name={[field.name, 'alkamisvuosi']} label="Alkamisvuosi">
                    <DatePicker
                      picker="month"
                      format="MM/YYYY"
                      inputReadOnly
                    />
                  </Form.Item>
                  <Form.Item name={[field.name, 'päättymisvuosi']} label="Päättymisvuosi">
                    <DatePicker
                      picker="month"
                      format="MM/YYYY"
                      inputReadOnly
                    />
                  </Form.Item>
                  <Form.Item
                                          label={`Lyhyt kuvaus projektista`}
                                          name={[field.name, "lyhytkuvaus"]}
                                          className="flex-grow"
                                      >
                                          <Input.TextArea rows={3} />
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

export default Projects;