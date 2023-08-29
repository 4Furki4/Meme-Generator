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
  const [memeSettings, setMemeSettings] = useState<MemeTextSettings | null>(() => {
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
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const data: MemeResponse = await getMemes()
        setData({ success: true, data: data.data })
        setIsMemeLoading(false)
        setSelectedMeme(data.data.memes[Math.floor(Math.random() * data.data.memes.length)])
        setOtherMemes(data.data.memes.filter((meme) => meme.id !== selectedMeme?.id))
      } catch (error) {
        console.log(error)
        setData({ success: false, data: { memes: [] } })
        setIsMemeLoading(false)
      } finally {
        setIsMemeLoading(false)
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
      }
    }
    fetchMemes()
  }, [])
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
