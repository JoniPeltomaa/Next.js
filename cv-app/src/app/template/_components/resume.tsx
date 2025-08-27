// Tila ja alustukset
'use client'
import React, { useRef, useState, useEffect } from 'react'
import Mustache from 'mustache'
import { Button, Checkbox } from 'antd'
import { useRouter } from 'next/navigation'
import { useReactToPrint } from 'react-to-print'
import usersGlobalStore from '@/store/users-store'
import { ITemplate } from '@/interfaces'

const generateStars = (arviointi: number = 0) =>
  '★'.repeat(arviointi) + '☆'.repeat(5 - arviointi)

const sortKurssi = (list: any[]) => {
  const parseDate = (raw: string): Date => {
    if (!raw) return new Date(0)

    // Korvaa pisteet ja kauttaviivat viivoilla
    let cleaned = raw.replace(/[./]/g, '-')

    // Jos muodossa "MM-YYYY", vaihda "YYYY-MM"
    const parts = cleaned.split('-')
    if (parts.length === 2 && parts[0].length === 2) {
      return new Date(`${parts[1]}-${parts[0]}-01`)
    }

    // Jos muodossa "YYYY-MM", käytä sellaisenaan
    if (parts.length === 2 && parts[0].length === 4) {
      return new Date(`${cleaned}-01`)
    }

    // Jos pelkkä vuosi
    if (parts.length === 1 && parts[0].length === 4) {
      return new Date(`${parts[0]}-01-01`)
    }

    return new Date(0)
  }

  return [...list].sort((a, b) => {
    const dateA = parseDate(a.alkamisvuosi || a.alku || '')
    const dateB = parseDate(b.alkamisvuosi || b.alku || '')

    const nameA = (a.kurssi || '').toLowerCase()
    const nameB = (b.kurssi || '').toLowerCase()

    // Uusimmat ensin, sitten kurssin nimi
    if (dateB.getTime() !== dateA.getTime()) return dateB.getTime() - dateA.getTime()
    return nameA.localeCompare(nameB)
  })
}

const sortOsaaminen = (list: any[]) => {
  return [...list].sort((a, b) => {
    const starsA = a.arviointi || 0
    const starsB = b.arviointi || 0

    const nameA = (a.tekniikka || '').toLowerCase()
    const nameB = (b.tekniikka || '').toLowerCase()

    // Tähtien määrä ensin, sitten tekniikan nimi
    if (starsB !== starsA) return starsB - starsA
    return nameA.localeCompare(nameB)
  })
}

const sortKielet = (list: any[]) => {
  return [...list].sort((a, b) => {
    const starsA = a.arviointi || 0
    const starsB = b.arviointi || 0

    const nameA = (a.kieli || a.nimi || '').toLowerCase()
    const nameB = (b.kieli || b.nimi || '').toLowerCase()

    if (starsB !== starsA) return starsB - starsA
    return nameA.localeCompare(nameB)
  })
}

const sortTyopaikat = (list: any[]) => {
  const parseDate = (raw: string): Date => {
    if (!raw) return new Date(0)

    // Korvaa pisteet ja kauttaviivat viivoilla
    let cleaned = raw.replace(/[./]/g, '-')

    const parts = cleaned.split('-')

    // Jos muodossa "MM-YYYY", vaihda "YYYY-MM"
    if (parts.length === 2 && parts[0].length === 2) {
      return new Date(`${parts[1]}-${parts[0]}-01`)
    }

    // Jos muodossa "YYYY-MM", käytä sellaisenaan
    if (parts.length === 2 && parts[0].length === 4) {
      return new Date(`${cleaned}-01`)
    }

    // Jos pelkkä vuosi
    if (parts.length === 1 && parts[0].length === 4) {
      return new Date(`${parts[0]}-01-01`)
    }

    return new Date(0)
  }

  return [...list].sort((a, b) => {
    const dateA = parseDate(a.päättymispäivä || a.loppu || a.alkamispäivä || a.alku || '')
    const dateB = parseDate(b.päättymispäivä || b.loppu || b.alkamispäivä || b.alku || '')

    const nameA = (a.työnimike || a.työpaikka || '').toLowerCase()
    const nameB = (b.työnimike || b.työpaikka || '').toLowerCase()

    if (dateB.getTime() !== dateA.getTime()) return dateB.getTime() - dateA.getTime()
    return nameA.localeCompare(nameB)
  })
}

const sortSuosittelijat = (list: any[]) => {
  return [...list].sort((a, b) => {
    const nameA = (a.nimi || a.suosittelija || '').toLowerCase()
    const nameB = (b.nimi || b.suosittelija || '').toLowerCase()
    return nameA.localeCompare(nameB)
  })
}

const sortKoulutus = (list: any[]) => {
  const parseDate = (raw: string): Date => {
    if (!raw) return new Date(0)

    // Korvaa pisteet ja kauttaviivat viivoilla
    let cleaned = raw.replace(/[./]/g, '-')

    // Jos muodossa "MM-YYYY", vaihda "YYYY-MM"
    const parts = cleaned.split('-')
    if (parts.length === 2 && parts[0].length === 2) {
      return new Date(`${parts[1]}-${parts[0]}-01`)
    }

    // Jos muodossa "YYYY-MM", käytä sellaisenaan
    if (parts.length === 2 && parts[0].length === 4) {
      return new Date(`${cleaned}-01`)
    }

    // Jos pelkkä vuosi
    if (parts.length === 1 && parts[0].length === 4) {
      return new Date(`${parts[0]}-01-01`)
    }

    return new Date(0)
  }

  return [...list].sort((a, b) => {
    const dateA = parseDate(a.päättymisvuosi || a.loppu || a.alkamisvuosi || a.alku || '')
    const dateB = parseDate(b.päättymisvuosi || b.loppu || b.alkamisvuosi || b.alku || '')

    const nameA = (a.tutkinto || a.pätevyys || a.muututkinto || '').toLowerCase()
    const nameB = (b.tutkinto || b.pätevyys || b.muututkinto || '').toLowerCase()

    if (dateB.getTime() !== dateA.getTime()) return dateB.getTime() - dateA.getTime()
    return nameA.localeCompare(nameB)
  })
}

const sortHarrastukset = (list: { harrastus: string }[]) => {
  return [...list].sort((a, b) => a.harrastus.localeCompare(b.harrastus))
}


function Resume({ template }: { template: ITemplate }) {
  const router = useRouter()
  const { currentUserData } = usersGlobalStore()

  const [visibleSections, setVisibleSections] = useState({
    osaaminen: true,
    ammatti: true,
    kielet: true,
    koulutus: true,
    työpaikat: true,
    muukoulutus: true,
    harrastukset: true,
    profiilitekstit: true,
    kurssi: true,
    projektit: true,
    suosittelija: true,
  })

  const [visibleItems, setVisibleItems] = useState<{ [key: string]: { [i: number]: boolean } }>({})
  const [printTitles, setPrintTitles] = useState<{ [key: string]: boolean }>({
    osaaminen: true,
    kielet: true,
    koulutus: true,
    työpaikat: true,
    muukoulutus: true,
    harrastukset: true,
    profiilitekstit: true,
    kurssi: true,
    suosittelija: true,
    projektit: true,
    ammatti: true,
  });

  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: 'Tulostettava dokumentti',
  });

// Datahaku ja toggle-funktiot

  useEffect(() => {
    const data = currentUserData?.profileDataForResume
    if (data) {
      const createMap = (key: string) =>
        Object.fromEntries(data[key]?.map((_: any, i: number) => [i, true]) || [])
      const keys = Object.keys(visibleSections)
      const newMap: any = {}
      keys.forEach(k => {
        newMap[k] = createMap(k)
      })
      setVisibleItems(newMap)
    }
  }, [currentUserData?.profileDataForResume])

  const toggleSection = (section: string) => {
    setVisibleSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleItem = (section: string, index: number) => {
    setVisibleItems(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [index]: !prev[section][index],
      },
    }))
  }

// Mustache-renderöinti 

  if (!currentUserData?.profileDataForResume) {
    return <div>Käyttäjän tietoja ei löytynyt</div>
  }

  const { profileDataForResume } = currentUserData

  const html = Mustache.render(template.html, {
    ...profileDataForResume,

    osaaminen: visibleSections.osaaminen
      ? sortOsaaminen(
          profileDataForResume.osaaminen?.filter((_, i) => visibleItems.osaaminen?.[i])
        )?.map(o => ({
          tekniikka: o.tekniikka??  '',
          stars: generateStars(o.arviointi),
        }))
      : [],

    kielet: visibleSections.kielet
      ? sortKielet(
          profileDataForResume.kielet?.filter((_, i) => visibleItems.kielet?.[i])
        )?.map(k => ({
          kieli: k.kieli ?? '',
          stars: generateStars(k.arviointi),
        }))
      : [],

    kurssi: visibleSections.kurssi
      ? sortKurssi(
          profileDataForResume.kurssi?.filter((_, i) => visibleItems.kurssi?.[i])
        )?.map(t => ({
          kurssi: t.kurssi ?? '',
          koulu: t.koulu ?? '',
          alkamisvuosi: t.alkamisvuosi ?? t.alku ?? '',
          päättymisvuosi: t.päättymisvuosi ?? t.loppu ?? '',
        }))
      : [],

    työpaikat: visibleSections.työpaikat
      ? sortTyopaikat(
          profileDataForResume.työpaikat?.filter((_, i) => visibleItems.työpaikat?.[i])
        )?.map(t => ({
          työnimike: t.työnimike ?? t.työpaikka ?? '',
          organisaatio: t.organisaatio ?? '',
          alkamispäivä: t.alkamispäivä ?? t.alku ?? '',
          päättymispäivä: t.päättymispäivä ?? t.loppu ?? '',
          työtehtäväkuvaus: t.työtehtäväkuvaus ?? t.kuvaus ?? '',
        }))
      : [],

    suosittelija: visibleSections.suosittelija
      ? sortSuosittelijat(
          profileDataForResume.suosittelija?.filter((_, i) => visibleItems.suosittelija?.[i])
        )?.map(t => ({
          nimi: t.nimi ?? t.susittelija ?? '',
          tittelijaorganisaatio: t.tittelijaorganisaatio ?? '',
          työsuhdesinuun: t.työsuhdesinuun ?? '',
          sähköposti: t.sähköposti ?? '',
          puhelinnumero: t.puhelinnumero ?? '',
        }))
      : [],

    koulutus: visibleSections.koulutus
      ? sortKoulutus(
          profileDataForResume.koulutus?.filter((_, i) => visibleItems.koulutus?.[i])
        )?.map(t => ({
          pätevyys: t.pätevyys ?? t.tutkinto ?? '',
          koulu: t.koulu ?? '',
          alkamisvuosi: t.alkamisvuosi ?? t.alku ?? '',
          päättymisvuosi: t.päättymisvuosi ?? t.loppu ?? '',
        }))
      : [],

    muukoulutus: visibleSections.muukoulutus
      ? sortKoulutus(
          profileDataForResume.muukoulutus?.filter((_, i) => visibleItems.muukoulutus?.[i])
        )?.map(t => ({
          pätevyys: t.pätevyys ?? t.muututkinto ?? '',
          koulu: t.koulu ?? '',
          alkamisvuosi: t.alkamisvuosi ?? t.alku ?? '',
          päättymisvuosi: t.päättymisvuosi ?? t.loppu ?? '',
        }))
      : [],

    projektit: visibleSections.projektit
      ? sortKoulutus(
          profileDataForResume.projektit?.filter((_, i) => visibleItems.projektit?.[i])
        )?.map(t => ({
          projektinimi: t.projektinimi ?? t.projekti ?? '',
          roolivastuu: t.roolivastuu ?? '',
          alkamisvuosi: t.alkamisvuosi ?? t.alku ?? '',
          päättymisvuosi: t.päättymisvuosi ?? t.loppu ?? '',
          lyhytkuvaus: t.lyhytkuvaus ?? '',
        }))
      : [],

    harrastukset: visibleSections.harrastukset
      ? sortHarrastukset(
      profileDataForResume.harrastukset?.filter((_, i) => visibleItems.harrastukset?.[i]) || [])
      : [],


    profiilitekstit: visibleSections.profiilitekstit
      ? profileDataForResume.profiilitekstit?.filter((_, i) => visibleItems.profiilitekstit?.[i])
      : [],
    
    ammatti: visibleSections.ammatti
      ? profileDataForResume.ammatti?.filter((_, i) => visibleItems.ammatti?.[i])
      : [],
  })

// JSX-renderöinti
  return (
    <div className="flex flex-col gap-6">
      {/* Yläpainikkeet */}
      <div className="flex justify-end gap-4">
        <Button onClick={() => router.push('/')}>Takaisin Mallipohjiin</Button>
        <Button type="primary" onClick={handlePrint}>Tulosta tai Tallenna PDF</Button>
      </div>

      {/* Checkbox-ryhmät */}
      <div className="flex flex-col gap-5">
        {Object.keys(visibleSections).map(section => (
          <div key={section} className="border-l-2 pl-4 mb-4">
            {/* Osion näkyvyys */}
            <Checkbox
              className="font-semibold text-lg text-blue-700"
              checked={visibleSections[section]}
              onChange={() => toggleSection(section)}
            >
              Näytä {section}
            </Checkbox>

            {/* Yksittäiset tietueet */}
            {visibleSections[section] && (
              <div className="ml-4 mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profileDataForResume[section]?.map((item: any, i: number) => (
                  <div
                    key={`${section}-${i}`}
                    className="p-3 border rounded shadow-sm bg-white hover:shadow-md transition"
                  >
                    <Checkbox
                      checked={visibleItems[section]?.[i]}
                      onChange={() => toggleItem(section, i)}
                    >
                      {item.nimi ||
                        item.ammatti ||
                        item.työnimike ||
                        item.työpaikka ||
                        item.tutkinto ||
                        item.muututkinto ||
                        item.pätevyys ||
                        item.kieli ||
                        item.tekniikka ||
                        item.harrastus ||
                        item.kurssi ||
                        item.projektit ||
                        item.suosittelija ||
                        `Profiiliteksti ${i + 1}`}
                    </Checkbox>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PDF-alue */}
      <div className="border border-gray-300 p-4 rounded">
        <div
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
)
}

export default Resume

