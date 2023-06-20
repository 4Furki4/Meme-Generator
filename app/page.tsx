import MainMeme from './Components/MainMeme'
import getMemes from './methods/getMemes'

export default async function Home() {
  const data: MemeResponse = await getMemes()
  if (!data.success) return <h1>Something went wrong</h1>
  const randomMeme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)]
  return (
    <main>
      <MainMeme randomMeme={randomMeme} />
    </main>
  )
}
