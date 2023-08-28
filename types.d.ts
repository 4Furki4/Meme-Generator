type MemeResponse = {
    success: boolean;
    data: {
        memes: Meme[]
    }
}
type Meme = {
    "id": string,
    "name": string,
    "url": string,
    "width": number,
    "height": number,
    "box_count": number,
    "captions": number
}

type MemeTextSettings = {
    id: number
    text: string
    width: number
    height: number
    color: string
    outlineColor: string
    fontSize: number
    fontFamily: string
    textAlign: string
}