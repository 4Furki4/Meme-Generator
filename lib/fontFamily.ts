import localFont from "next/font/local"
import { Inter } from 'next/font/google'
export const getFontFamilies = () => {
    return [
        "Inter",
        "Impact",
        "Arial",
        "Comic Sans MS",
        "Helvetica",
        "Times New Roman",
        "Times",
        "Courier New",
        "Courier",
        "Verdana",
        "Georgia",
        "Palatino",
        "Garamond",
        "Bookman",
        "Trebuchet MS",
        "Arial Black"
    ]
}
export const inter = Inter({
    subsets: ["latin"]
})
export const timesNewRoman = localFont({
    src: "../fonts/times.woff2"
})
export const arial = localFont({
    src: [
        {
            path: "../fonts/ARIAL.woff",
            style: "normal",
        },
        {
            path: "../fonts/ARIALBD.woff",
        },
        {
            path: "../fonts/ArialCEBoldItalic.woff",
            style: "italic",
        },
    ]
})




export function getFontFamilyClass(fontFamily: string) {
    switch (fontFamily) {
        case "times new roman":
            return timesNewRoman.className
        case "inter":
            return inter.className
        default:
            return arial.className
    }
}
