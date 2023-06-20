import Image from "next/image"


export default function MainMeme({ randomMeme }: { randomMeme: Meme }) {
    return (
        <div>
            {randomMeme && (
                <>
                    <Image
                        alt={randomMeme?.name}
                        // height={meme.height}
                        // width={meme.width}
                        width={500}
                        height={500}
                        src={randomMeme?.url} />
                </>
            )}
        </div>
    )
}
