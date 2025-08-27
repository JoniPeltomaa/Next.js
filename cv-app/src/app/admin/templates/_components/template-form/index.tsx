'use client'
import { Button, Form, Input, message, Upload } from 'antd'
import React from 'react'
import { App } from 'antd';
import CodeMirror from '@uiw/react-codemirror'
import { useRouter } from 'next/navigation'
import { uploadFileToSupabaseAndReturnUrl } from '@/helpers/media-upload'
import { createNewTemplate, updateTemplateById } from '@/server-actions/templates'

function TemplateForm({
  initialValues = {},
  type = 'new',
}: {
  initialValues?: any
  type?: 'new' | 'edit'
}) {
  const [html, setHtml] = React.useState<any>(initialValues?.html || '')
  const [thumbnail, setThumbnail] = React.useState<any>(initialValues?.thumbnail || '')
  const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter()

  const { message } = App.useApp(); // ✅ tämä on nyt turvallista käyttää



  const onFinish = async (values: any) => {
    try {
      setLoading(true)

      // ✅ Tarkistetaan ja ladataan thumbnail Supabaseen
      if (typeof thumbnail !== 'string') {
        const uploadedUrl = await uploadFileToSupabaseAndReturnUrl(thumbnail)
        if (!uploadedUrl) {
          message.error('Kuvan lataus epäonnistui')
          return
        }
        values.thumbnail = uploadedUrl
      } else {
        values.thumbnail = thumbnail
      }

      // ✅ Varmistetaan että HTML ei ole tyhjä
      if (!html || html.trim() === '') {
        message.error('HTML-kenttä ei voi olla tyhjä')
        return
      }

      values.html = html

      console.log('Tallennettava data MongoDB:hen:', values)

      let response = null
      if (type === 'new') {
        response = await createNewTemplate(values)
      } else {
        if (!initialValues._id) {
          message.error('Päivitys epäonnistui: puuttuva ID')
          return
        }
        response = await updateTemplateById(initialValues._id, values)
      }

      if (response?.success) {
        message.success(
          type === 'new' ? 'Malli pohjan luonti onnistui' : 'Malli pohjan päivitys onnistui'
        )
        router.push('/admin/templates')
      } else {
        message.error(response?.message || 'Tallennus epäonnistui')
      }
    } catch (error: any) {
      console.error('Virhe tallennuksessa:', error)
      message.error(error.message || 'Tuntematon virhe')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Thumbnail-esikatselu
  let selectedFileList: any[] = []
  if (type === 'edit' && thumbnail && typeof thumbnail === 'string') {
    selectedFileList = [
      {
        url: initialValues.thumbnail,
      },
    ]
  } else if (thumbnail) {
    selectedFileList = [
      {
        url: URL.createObjectURL(thumbnail),
      },
    ]
  }

  return (
    <div className="mt-7">
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="mt-7 flex flex-col gap-7"
        initialValues={initialValues}
      >
        <Form.Item
          label="Nimi"
          name="name"
          rules={[{ required: true, message: 'Anna mallille nimi' }]}
        >
          <Input placeholder="Anna malli pohjalle nimi" />
        </Form.Item>

        <Form.Item label="Pikku kuva">
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setThumbnail(file)
              return false
            }}
            onRemove={() => setThumbnail('')}
            fileList={selectedFileList}
          >
            <div className="span text-xs">Päivitä Pikku Kuva</div>
          </Upload>
        </Form.Item>

        <Form.Item label="HTML">
          <CodeMirror value={html} onChange={(value) => setHtml(value)} />
        </Form.Item>

        <div className="flex justify-end gap-7">
          <Button onClick={() => router.push('/admin/templates')} type="default" disabled={loading}>
            Peruuta
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tallenna
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default TemplateForm

