const handleChange = (e, prevValue, setValue) => {
    setValue({
        ...prevValue,
        [e.target.name]: e.target.value
    })
}

export default handleChange