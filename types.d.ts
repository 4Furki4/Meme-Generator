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
    isAllCaps: boolean
    isBold: boolean
    isItalic: boolean
    textDecoration: "shadow" | "outline" | "none"
    outlineColor: string
    outlineWidth: number
    fontSize: number
    fontFamily: string
    textAlign: "left" | "center" | "right"
    verticalAlign: "top" | "center" | "bottom"
    opacity: number
}
type MemeTextSettings = {
    id: string
    settings: MemeTextSetting[]
}
type SettingsContext = {
    memeSettings: MemeTextSettings | null,
    setMemeSettings: Dispatch<SetStateAction<MemeTextSettings | null>>
} | null