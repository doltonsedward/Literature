const getCollection = async (API, setCollection, literature_id, notif) => {
    try {
        const response = await API.get('/collection/' + literature_id)

        setCollection(response.data.literature)
    } catch (error) {
        const message = error?.response?.data.message || 'Unknow error'
        notif.error(message)
    }
}

export default getCollection