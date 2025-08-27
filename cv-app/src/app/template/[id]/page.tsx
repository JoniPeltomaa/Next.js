import { getTemplateById } from '@/server-actions/templates';
import React from 'react';
import Resume from '../_components/resume';

async function TemplatePreview(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params; // ✅ await the params object
  const response = await getTemplateById(id);

  return (
    <div className="flex justify-center p-8">
      <Resume template={response.data} />
    </div>
  );
}

export default TemplatePreview;


