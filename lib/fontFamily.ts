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
    src: "../fonts/arial.woff2",
})
export const courierPrime = localFont({
    src: [
        {
            path: "../fonts/CourierPrime-Regular.ttf",
            weight: "400",
            style: "normal"
        },
        {
            path: "../fonts/CourierPrime-Bold.ttf",
            weight: "700",
            style: "bold"
        },
        {
            path: "../fonts/CourierPrime-Italic.ttf",
            weight: "400",
            style: "italic"
        },
        {
            path: "../fonts/CourierPrime-BoldItalic.ttf",
            weight: "700",
            style: "italic"
        }
    ]
})




export function getFontFamilyClass(fontFamily: string) {
    switch (fontFamily) {
        case "times new roman":
            return timesNewRoman.className
        case "inter":
            return inter.className
        case "courier":
            return courierPrime.className
        default:
            return arial.className
    }
}
