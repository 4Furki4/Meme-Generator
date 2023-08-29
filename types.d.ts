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
type MemeTextSetting = {
    text: string
    width: number
    height: number
    color: string
    outlineColor: string
    fontSize: number
    fontFamily: string
    textAlign: string
}
type MemeTextSettings = {
    id: string
    settings: MemeTextSetting[]
}
type SettingsContext = {
    memeSettings: MemeTextSettings | null,
    setMemeSettings: Dispatch<SetStateAction<MemeTextSettings | null>>
} | null