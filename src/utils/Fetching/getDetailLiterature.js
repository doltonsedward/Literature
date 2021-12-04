const getDetailLiterature = async (API, setLiterature, literature_id, notif) => {
    try {
        const response = await API.get('/literature/' + literature_id)

        setLiterature(response.data.literature)
    } catch (error) {
        const message = error.response.data.message || 'Unknow error'
        notif.error(message)
    }
}

export default getDetailLiterature