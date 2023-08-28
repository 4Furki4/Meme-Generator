export default async function getMemes() {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "get_memes")
    if (response.status !== 200) throw new Error("Failed to fetch memes")
    return response.json()
}