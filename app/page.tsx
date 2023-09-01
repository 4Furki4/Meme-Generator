"use client"
import { useEffect, useState } from 'react'
import MainMeme from './Components/MainMeme'
import getMemes from './methods/getMemes'
import MemeSettings from './Components/MemeSettings'
import { SettingsContext } from '@/context/SettingsProvider'

export default function Home() {
  const [data, setData] = useState<MemeResponse>({ success: false, data: { memes: [] } })
  const [isMemeLoading, setIsMemeLoading] = useState<boolean>(true)
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null)
  const [memeSettings, setMemeSettings] = useState<MemeTextSettings | null>(null)
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response: MemeResponse = await getMemes()
        if (!response.success) throw new Error('Something went wrong')
        setData(() => response)
        setSelectedMeme(() => response.data.memes[Math.floor(Math.random() * response.data.memes.length)])
        setIsMemeLoading(() => false)
      } catch (error) {
        console.log(error)
        setData({ success: false, data: { memes: [] } })
        setIsMemeLoading(() => false)
      } finally {
        setIsMemeLoading(() => false)
      }
    }
    fetchMemes()
  }, [])
  useEffect(() => {
    setMemeSettings(() => {
      const memeSetting: MemeTextSetting[] = []
      let memeSettings: MemeTextSettings = {
        id: "",
        settings: []
      };
      for (let i = 0; i < selectedMeme?.box_count!; i++) {
        memeSetting.push({
          color: '#ffffff',
          fontSize: 50,
          text: `Text #${i + 1}`,
          fontFamily: 'Impact',
          textAlign: 'left',
          verticalAlign: 'top',
          width: 500,
          height: 500,
          textDecoration: 'outline',
          outlineColor: '#000000',
          outlineWidth: 50,
          isAllCaps: true,
          isBold: false,
          isItalic: false,
          opacity: 1
        })
      }
      memeSettings.id = selectedMeme?.id!
      memeSettings.settings = memeSetting
      return memeSettings
    })
  }, [selectedMeme])
  if (isMemeLoading) return <h1>Loading...</h1>
  if (!data.success) return <h1>Something went wrong</h1>
  return (
    <SettingsContext.Provider value={{ memeSettings, setMemeSettings }}>
      <main className='flex flex-col md:flex-row w-11/12 md:w-3/4 mx-auto gap-4'>
        <MainMeme selectedMeme={selectedMeme} />
        <MemeSettings memes={data.data.memes} selectedMeme={selectedMeme} setSelectedMeme={setSelectedMeme} />
      </main>
    </SettingsContext.Provider>
  )
}
