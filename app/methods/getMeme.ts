

export default async function getMeme() {
    // const response = await api.get<MemeResponse>("get_memes");
    // if (!response.data.success) throw new Error("Failed to fetch memes")
    // return response.data.data;
    const response = await fetch(process.env.BASE_URL + "get_memes", {
        next: {
            revalidate: 60
        }
    })
    if (response.status !== 200) throw new Error("Failed to fetch memes")
    return response.json()
}