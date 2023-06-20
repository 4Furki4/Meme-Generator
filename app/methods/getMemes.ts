export default async function getMemes() {
    const response = await fetch(process.env.BASE_URL + "get_memes")
    if (response.status !== 200) throw new Error("Failed to fetch memes")
    return response.json()
}