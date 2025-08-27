import React from 'react'
import TemplateForm from '../../_components/template-form'
import { getTemplateById } from '@/server-actions/templates'

async function EditTemplate({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const response = await getTemplateById(id)

  if (!response.success) {
    return <div>{response.message}</div>
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-primary">Muokkaa Malli Pohjaa</h1>
      <TemplateForm initialValues={response.data} type="edit" />
    </div>
  )
}

export default EditTemplate

