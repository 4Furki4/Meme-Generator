"use client"
import { useEffect, useRef, useState } from 'react'
import MainMeme from './Components/MainMeme'
import getMemes from './methods/getMemes'
import MemeSettings from './Components/MemeSettings'
import { SettingsContext } from '@/context/SettingsProvider'
import { Spicy_Rice } from 'next/font/google'
import Spinner from './Components/Spinner'
export default function Home() {
  const [data, setData] = useState<MemeResponse>({ success: false, data: { memes: [] } })
  const [isMemeLoading, setIsMemeLoading] = useState<boolean>(true)
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null)
  const [memeSettings, setMemeSettings] = useState<MemeTextSettings | null>(null)
  const memeRef = useRef<HTMLDivElement>(null)
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
          fontSize: 40,
          text: `Text #${i + 1}`,
          fontFamily: 'arial',
          textAlign: 'left',
          verticalAlign: 'top',
          width: 500,
          height: 500,
          textDecoration: 'outline',
          outlineColor: '#000000',
          outlineWidth: 1,
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
  if (isMemeLoading) return <Spinner className='absolute inset-0 m-auto' />
  if (!data.success) return <h1>Something went wrong</h1>
  return (
    <SettingsContext.Provider value={{ memeSettings, setMemeSettings }}>
      <main className='flex flex-col lg:flex-row w-11/12 lg:w-3/4 mx-auto gap-4 my-12'>
        <MainMeme memeRef={memeRef} selectedMeme={selectedMeme} />
        <MemeSettings memeRef={memeRef} memes={data.data.memes} selectedMeme={selectedMeme} setSelectedMeme={setSelectedMeme} />
      </main>
    </SettingsContext.Provider>
  )
}
