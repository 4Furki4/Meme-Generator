import { toPng } from "html-to-image"
import { Dispatch, SetStateAction } from "react"


export function handleTextChange(context: SettingsContext, text: string, index: number) {
    context?.setMemeSettings((prev: MemeTextSettings) => {
        return {
            ...prev,
            settings: prev?.settings.map((setting, i) => {
                if (i === index) {
                    return {
                        ...setting,
                        text
                    }
                }
                return setting
            })
        }
    })
}

export function handleTextColorChange(context: SettingsContext, color: string, index: number) {
    context?.setMemeSettings((prev: MemeTextSettings) => {
        return {
            ...prev,
            settings: prev?.settings.map((setting, i) => {
                if (i === index) {
                    return {
                        ...setting,
                        color
                    }
                }
                return setting
            })
        }
    })
}

export function handleOutlineColorChange(context: SettingsContext, color: string, index: number) {
    context?.setMemeSettings((prev: MemeTextSettings) => {
        return {
            ...prev,
            settings: prev?.settings.map((setting, i) => {
                if (i === index) {
                    return {
                        ...setting,
                        outlineColor: color
                    }
                }
                return setting
            })
        }
    })
}
export function handleChangeFontFamily(
    currentFont: string, selectedFontFamily: string,
    context: SettingsContext, index: number,
    setOpenFontFamily: Dispatch<SetStateAction<boolean>>, setSelectedFontFamily: Dispatch<SetStateAction<string>>) {
    setSelectedFontFamily(() => currentFont === selectedFontFamily ? "arial" : currentFont)
    console.log("currentFont", currentFont)
    console.log("selectedFontFamily", selectedFontFamily)
    context?.setMemeSettings((prev: MemeTextSettings) => {
        return {
            ...prev,
            settings: prev?.settings.map((setting, i) => {
                if (i === index) {
                    return {
                        ...setting,
                        fontFamily: currentFont === selectedFontFamily ? "arial" : currentFont
                    }
                }
                return setting
            })
        }
    })
    setOpenFontFamily(false)
}

export function handleAllCapsed(context: SettingsContext, index: number) {
    context?.setMemeSettings((prev: MemeTextSettings) => {
        return {
            ...prev,
            settings: prev?.settings.map((setting, i) => {
                if (i === index) {
                    return {
                        ...setting,
                        isAllCaps: !setting.isAllCaps
                    }
                }
                return setting
            })
        }
    })
}

export function handleBolded(context: SettingsContext, index: number) {
    context?.setMemeSettings((prev: MemeTextSettings) => {
        return {
            ...prev,
            settings: prev?.settings.map((setting, i) => {
                if (i === index) {
                    return {
                        ...setting,
                        isBold: !setting.isBold
                    }
                }
                return setting
            })
        }
    })
}

export function handleItalicized(context: SettingsContext, index: number) {
    context?.setMemeSettings((prev: MemeTextSettings) => {
        return {
            ...prev,
            settings: prev?.settings.map((setting, i) => {
                if (i === index) {
                    return {
                        ...setting,
                        isItalic: !setting.isItalic
                    }
                }
                return setting
            })
        }
    })
}


export function handleFontSizeChange(context: SettingsContext, fontSize: number, index: number) {
    context?.setMemeSettings((prev: MemeTextSettings) => {
        return {
            ...prev,
            settings: prev?.settings.map((setting, i) => {
                if (i === index) {
                    return {
                        ...setting,
                        fontSize
                    }
                }
                return setting
            })
        }
    })
}

export function handleTextDecoration(context: SettingsContext, textDecoration: "shadow" | "outline" | "none", index: number) {
    context?.setMemeSettings((prev: MemeTextSettings) => {
        return {
            ...prev,
            settings: prev?.settings.map((setting, i) => {
                if (i === index) {
                    return {
                        ...setting,
                        textDecoration
                    }
                }
                return setting
            })
        }
    })
}

export function handleOutlineWidthChange(context: SettingsContext, outlineWidth: number, index: number) {
    if (outlineWidth < 0 || outlineWidth > 100) return
    context?.setMemeSettings((prev: MemeTextSettings) => {
        return {
            ...prev,
            settings: prev.settings.map((setting, i) => {
                if (i === index) {
                    return {
                        ...setting,
                        outlineWidth
                    }
                }
                return setting
            })
        }
    })
}

export function handleTextAlignChange(context: SettingsContext, textAlign: "left" | "center" | "right", index: number) {
    context?.setMemeSettings((prev: MemeTextSettings) => {
        return {
            ...prev,
            settings: prev.settings.map((setting, i) => {
                if (i === index) {
                    return {
                        ...setting,
                        textAlign
                    }
                }
                return setting
            })
        }
    })
}

export function handleVerticalAlignChange(context: SettingsContext, verticalAlign: "top" | "center" | "bottom", index: number) {
    context?.setMemeSettings((prev: MemeTextSettings) => {
        return {
            ...prev,
            settings: prev.settings.map((setting, i) => {
                if (i === index) {
                    return {
                        ...setting,
                        verticalAlign
                    }
                }
                return setting
            })
        }
    })
}

export function handleOpacityChange(context: SettingsContext, opacity: number, index: number) {
    if (opacity < 0 || opacity > 100) return
    context?.setMemeSettings((prev: MemeTextSettings) => {
        return {
            ...prev,
            settings: prev.settings.map((setting, i) => {
                if (i === index) {
                    return {
                        ...setting,
                        opacity
                    }
                }
                return setting
            })
        }
    })
}
export function handleGenerateMeme(memeRef: React.RefObject<HTMLDivElement>) {
    toPng(memeRef?.current!).then((dataUrl) => {
        const link = document.createElement("a")
        link.download = "meme.png"
        link.href = dataUrl
        link.click()
    })
}