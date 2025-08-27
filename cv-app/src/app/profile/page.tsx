'use client';
import React, { useEffect, useState } from 'react';
import { Button, Form, message, Tabs, ConfigProvider } from 'antd';
import Basic from './_components/basic';
import Experience from './_components/experience';
import Education from './_components/education';
import Skills from './_components/skills';
import usersGlobalStore from '@/store/users-store';
import { updateUserProfile } from '@/server-actions/users';
import { uploadFileToSupabaseAndReturnUrl } from '@/helpers/media-upload';
import dayjs, { Dayjs } from 'dayjs';
import fi from 'antd/locale/fi_FI';
import 'dayjs/locale/fi';
import OtherEducation from './_components/othereducation';
import Hobbies from './_components/hobbies';
import Courses from './_components/courses';
import Referrer from './_components/referrer';
import Languages from './_components/languages';
import Projects from './_components/projects';

dayjs.locale('fi');

type KoulutusEntry = {
  pätevyys?: string;
  koulu?: string;
  alkamisvuosi?: string | Dayjs | null;
  päättymisvuosi?: string | Dayjs | null;
};

type KurssiEntry = {
  kurssi?: string;
  koulu?: string;
  alkamisvuosi?: string | Dayjs | null;
  päättymisvuosi?: string | Dayjs | null;
};

type TyöpaikkaEntry = {
  työnimike?: string;
  organisaatio?: string;
  alkamispäivä?: string | Dayjs | null;
  päättymispäivä?: string | Dayjs | null;
  työtehtäväkuvaus?: string;
};

type ProjektiEntry = {
  projektinimi?: string;
  roolivastuualue?: string;
  alkamisvuosi?: string | Dayjs | null;
  päättymisvuosi?: string | Dayjs | null;
  lyhytkuvaus?: string;
};

const safeFormatDate = (value: any): string | null => {
  if (dayjs.isDayjs(value)) return value.format('MM/YYYY');
  const parsed = dayjs(value, 'MM/YYYY');
  return parsed.isValid() ? parsed.format('MM/YYYY') : null;
};

function ProfileSivu() {
  const { currentUserData, setCurrentUserData } = usersGlobalStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [candidatePhoto, setCandidatePhoto] = useState<any>(
    currentUserData?.profileDataForResume?.candidatePhoto || ''
  );
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    const raw = currentUserData?.profileDataForResume;
    if (raw) {
      const koulutus = Array.isArray(raw.koulutus)
        ? raw.koulutus.map((entry: KoulutusEntry) => ({
            ...entry,
            alkamisvuosi: entry.alkamisvuosi ? dayjs(entry.alkamisvuosi, 'MM/YYYY') : null,
            päättymisvuosi: entry.päättymisvuosi ? dayjs(entry.päättymisvuosi, 'MM/YYYY') : null,
          }))
        : [];
      
      const muukoulutus = Array.isArray(raw.muukoulutus)
        ? raw.muukoulutus.map((entry: KoulutusEntry) => ({
            ...entry,
            alkamisvuosi: entry.alkamisvuosi ? dayjs(entry.alkamisvuosi, 'MM/YYYY') : null,
            päättymisvuosi: entry.päättymisvuosi ? dayjs(entry.päättymisvuosi, 'MM/YYYY') : null,
          }))
        : [];
      
      const kurssi = Array.isArray(raw.kurssi)
      ? raw.kurssi.map((entry: KurssiEntry) => ({
          ...entry,
          alkamisvuosi: entry.alkamisvuosi ? dayjs(entry.alkamisvuosi, 'MM/YYYY') : null,
          päättymisvuosi: entry.päättymisvuosi ? dayjs(entry.päättymisvuosi, 'MM/YYYY') : null,
        }))
      : [];
      
      const työpaikat = Array.isArray(raw.työpaikat)
        ? raw.työpaikat.map((entry: TyöpaikkaEntry) => ({
            ...entry,
            alkamispäivä: entry.alkamispäivä ? dayjs(entry.alkamispäivä, 'MM/YYYY') : null,
            päättymispäivä: entry.päättymispäivä ? dayjs(entry.päättymispäivä, 'MM/YYYY') : null,
          }))
        : [];
       
      const projektit = Array.isArray(raw.projektit)
        ? raw.projektit.map((entry: ProjektiEntry) => ({
            ...entry,
            alkamisvuosi: entry.alkamisvuosi ? dayjs(entry.alkamisvuosi, 'MM/YYYY') : null,
            päättymisvuosi: entry.päättymisvuosi ? dayjs(entry.päättymisvuosi, 'MM/YYYY') : null,
          }))
        : [];  

      const profiilitekstit = Array.isArray(raw.profiilitekstit)
        ? raw.profiilitekstit.map((textObj: any) =>
            typeof textObj === 'string' ? { text: textObj } : textObj
          )
        : [];

      form.setFieldsValue({
        ...raw,
        koulutus,
        muukoulutus,
        kurssi,
        työpaikat,
        projektit,
        profiilitekstit,
      });
    }
  }, [currentUserData]);

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();
      setLoading(true);

      const koulutus = Array.isArray(values.koulutus)
        ? values.koulutus.map((entry: KoulutusEntry) => ({
            ...entry,
            alkamisvuosi: safeFormatDate(entry.alkamisvuosi),
            päättymisvuosi: safeFormatDate(entry.päättymisvuosi),
          }))
        : [];

      const muukoulutus = Array.isArray(values.muukoulutus)
        ? values.muukoulutus.map((entry: KoulutusEntry) => ({
            ...entry,
            alkamisvuosi: safeFormatDate(entry.alkamisvuosi),
            päättymisvuosi: safeFormatDate(entry.päättymisvuosi),
          }))
        : [];
      
      const kurssi = Array.isArray(values.kurssi)
        ? values.kurssi.map((entry: KurssiEntry) => ({
            ...entry,
            alkamisvuosi: safeFormatDate(entry.alkamisvuosi),
            päättymisvuosi: safeFormatDate(entry.päättymisvuosi),
          }))
        : [];

      const työpaikat = Array.isArray(values.työpaikat)
        ? values.työpaikat.map((entry: TyöpaikkaEntry) => ({
            ...entry,
            alkamispäivä: safeFormatDate(entry.alkamispäivä),
            päättymispäivä: safeFormatDate(entry.päättymispäivä),
          }))
        : [];

       const projektit = Array.isArray(values.projektit)
        ? values.projektit.map((entry: ProjektiEntry) => ({
            ...entry,
            alkamisvuosi: safeFormatDate(entry.alkamisvuosi),
            päättymisvuosi: safeFormatDate(entry.päättymisvuosi),
          }))
        : [];

      const profiilitekstit = Array.isArray(values.profiilitekstit)
        ? values.profiilitekstit.filter(
            (item: { text?: string }) => item?.text?.trim() !== ''
          )
        : [];

      const candidatePhotoUrl =
        typeof candidatePhoto === 'object'
          ? await uploadFileToSupabaseAndReturnUrl(candidatePhoto)
          : candidatePhoto;

      const valuesToSave = {
        ...values,
        koulutus,
        työpaikat,
        kurssi,
        muukoulutus,
        projektit,
        profiilitekstit,
        candidatePhoto: candidatePhotoUrl,
      };

      const response = await updateUserProfile({
        userId: currentUserData!._id,
        data: {
          ...currentUserData,
          profileDataForResume: valuesToSave,
        },
      });

      if (response.success) {
        message.success('Profiili päivitettiin onnistuneesti!');
        setCurrentUserData(response.data);
      } else {
        message.error('Päivitys epäonnistui.');
      }
    } catch (err: any) {
      message.error(err?.message || 'Tuntematon virhe tapahtui.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      key: '1',
      label: 'Perustiedot',
      children: (
        <Basic
          candidatePhoto={candidatePhoto}
          setCandidatePhoto={setCandidatePhoto}
        />
      ),
      forceRender: true,
    },
     {
      key: '2',
      label: 'Koulutus',
      children: <Education />,
      forceRender: true,
    },
    {
      key: '3',
      label: 'Muu Koulutus',
      children: <OtherEducation />,
      forceRender: true,
    },
    {
      key: '4',
      label: 'Työpaikat',
      children: <Experience />,
      forceRender: true,
    },
    {
      key: '5',
      label: 'Kurssit',
      children: <Courses />,
      forceRender: true,
    },
    {
      key: '6',
      label: 'Osaaminen',
      children: <Skills />,
      forceRender: true,
    },
      {
      key: '7',
      label: 'Projektit',
      children: <Projects />,
      forceRender: true,
    },
     {
      key: '8',
      label: 'Kielet',
      children: <Languages />,
      forceRender: true,
    },
    {
      key: '9',
      label: 'Harrastukset',
      children: <Hobbies />,
      forceRender: true,
    },
    {
      key: '10',
      label: 'Suosittelijat',
      children: <Referrer />,
      forceRender: true,
    },
  ];

  return (
    <ConfigProvider locale={fi}>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-bold uppercase text-primary">Profiili</h1>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabs} />
          <div className="flex justify-end mt-10 gap-4">
            <Button disabled={loading}>Peruuta</Button>
            <Button
              type="primary"
              loading={loading}
              onClick={() => setTimeout(() => form.submit(), 0)}
            >
              Tallenna & Päivitä
            </Button>
          </div>
        </Form>
      </div>
    </ConfigProvider>
  );
}

export default ProfileSivu;

