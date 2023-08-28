import Image from "next/image"


export default function MainMeme({ randomMeme }: { randomMeme: Meme | null }) {
    return (
        <div className="basis-full rounded-lg">
            {randomMeme && (
                <>
                    <Image
                        className="rounded-lg"
                        alt={randomMeme?.name}
                        width={500}
                        height={500}
                        src={randomMeme?.url} />
                </>
            )}
        </div>
    )
}
