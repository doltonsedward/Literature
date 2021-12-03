const handleAnyChange = (e, prevValue, setValue, setPreview) => {
    setValue({
        ...prevValue,
        [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
    })

    if (e.target.type === "file") {
        let url = URL.createObjectURL(e.target.files[0])
        setPreview(url)
    }
}

export default handleAnyChange