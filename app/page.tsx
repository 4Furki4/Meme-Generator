"use client"
import { useEffect, useState } from 'react'
import MainMeme from './Components/MainMeme'
import getMemes from './methods/getMemes'
import MemeSettings from './Components/MemeSettings'
import { SettingsContext } from '@/context/SettingsProvider'

export default function Home() {
  const [data, setData] = useState<MemeResponse>({ success: false, data: { memes: [] } })
  const [otherMemes, setOtherMemes] = useState<Meme[]>([])
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
        setOtherMemes(() => response.data.memes.filter((meme) => meme.id !== selectedMeme?.id))
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
              text: '',
              fontFamily: 'Impact',
              textAlign: 'left',
              width: 500,
              height: 500,
              outlineColor: '#000000',
            })
          }
          memeSettings.id = selectedMeme?.id!
          memeSettings.settings = memeSetting
          return memeSettings
        })
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
    setOtherMemes(() => data.data.memes.filter((meme) => meme.id !== selectedMeme?.id))
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
          text: '',
          fontFamily: 'Impact',
          textAlign: 'left',
          width: 500,
          height: 500,
          outlineColor: '#000000',
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
        <MainMeme randomMeme={selectedMeme} />
        <MemeSettings otherMemes={otherMemes} setOtherMemes={setOtherMemes} selectedMeme={selectedMeme} setSelectedMeme={setSelectedMeme} />
      </main>
    </SettingsContext.Provider>
  )
}
