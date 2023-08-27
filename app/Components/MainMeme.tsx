import Image from "next/image"


export default function MainMeme({ randomMeme }: { randomMeme: Meme }) {
    return (
        <div className="w-full h-full ">
            {randomMeme && (
                <>
                    <Image
                        alt={randomMeme?.name}
                        width={500}
                        height={500}
                        src={randomMeme?.url} />
                </>
            )}
        </div>
    )
}
