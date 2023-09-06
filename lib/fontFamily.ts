import localFont from "next/font/local"
import { Inter } from 'next/font/google'
export const getFontFamilies = () => {
    return [
        "Inter",
        "Impact",
        "Arial",
        "Open Sans",
        "Helvetica",
        "Times New Roman",
        "Courier Prime",
        "Verdana",
        "Georgia",
        "Palatino",
        "Garamond",
        "Bookman",
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
            path: "../fonts/CourierPrime/CourierPrime-Regular.ttf",
            weight: "400",
            style: "normal"
        },
        {
            path: "../fonts/CourierPrime/CourierPrime-Bold.ttf",
            weight: "700",
            style: "bold"
        },
        {
            path: "../fonts/CourierPrime/CourierPrime-Italic.ttf",
            weight: "400",
            style: "italic"
        },
        {
            path: "../fonts/CourierPrime/CourierPrime-BoldItalic.ttf",
            weight: "700",
        }
    ]
})

export const impact = localFont({
    src: "../fonts/impact.woff2"
})
export const openSans = localFont({
    src: [
        {
            path: "../fonts/OpenSans/OpenSans-Regular.woff2",
            weight: "400",
            style: "normal"
        },
        {
            path: "../fonts/OpenSans/OpenSans-Bold.woff2",
            weight: "700",
            style: "bold"
        },
        {
            path: "../fonts/OpenSans/OpenSans-Italic.woff2",
            weight: "400",
            style: "italic"
        },
        {
            path: "../fonts/OpenSans/OpenSans-BoldItalic.woff2",
            weight: "700",
            style: "italic"
        }
    ]
})

export const helvetica = localFont({
    src: [
        {
            path: "../fonts/Helvetica/Helvetica-Regular.woff2",
            weight: "400",
            style: "normal"
        },
        {
            path: "../fonts/Helvetica/Helvetica-Bold.woff2",
            weight: "700",
            style: "bold"
        },
        {
            path: "../fonts/Helvetica/Helvetica-Italic.woff2",
            weight: "400",
            style: "italic"
        },
        {
            path: "../fonts/Helvetica/Helvetica-BoldItalic.woff2",
            weight: "700",
            style: "italic"
        }
    ]
})

export const georgia = localFont({
    src: "../fonts/georgia.woff2",
})

export const palatino = localFont({
    src: "../fonts/palatino.woff2",
})

export const garamond = localFont({
    src: "../fonts/garamond.woff2",
})

export const bookman = localFont({
    src: "../fonts/bookman.woff2",
})
export const arialBlack = localFont({
    src: "../fonts/arial-black.woff2",
})
export function getFontFamilyClass(fontFamily: string) {
    switch (fontFamily) {
        case "times new roman":
            return timesNewRoman.className
        case "inter":
            return inter.className
        case "courier prime":
            return courierPrime.className
        case "impact":
            return impact.className
        case "open sans":
            return openSans.className
        case "helvetica":
            return helvetica.className
        case "georgia":
            return georgia.className
        case "palatino":
            return palatino.className
        case "garamond":
            return garamond.className
        case "bookman":
            return bookman.className
        case "arial black":
            return arialBlack.className
        default:
            return arial.className
    }
}
