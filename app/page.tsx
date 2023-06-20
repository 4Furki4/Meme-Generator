
import Image from 'next/image'
import getMeme from './methods/getMeme'

export default async function Home() {
  const data: MemeResponse = await getMeme()
  if (!data.success) return <h1>Something went wrong</h1>
  return (
    <main>
      {data && (
        <>
          {data.data.memes.map((meme) => (
            <div key={meme.id}>
              <h2>{meme.name}</h2>
              <Image alt={meme.name} src={meme.url} width={meme.width} height={meme.height} />
            </div>
          ))}
        </>
      )}
    </main>
  )
}
