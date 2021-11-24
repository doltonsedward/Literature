import './_Input.scss';

const InputFile = ({label, className, onClick, ...rest}) => {
    return (
        <>
            <label className="wrapper-input">
                <p style={{fontWeight: 800}}>{label}</p>
                <div className={className}>
                    <button className="input-theme">
                        Attach here
                        <input type="file" {...rest} onClick={onclick} />
                    </button>
                </div>
            </label>
        </>
    )
}

const InputBasic = ({...rest}) => {
    return (
        <label className="wrapper-input default">
            <input className="input-basic" {...rest} />
        </label>
    )
}

const Input = ({label, variant, onClick, ...rest}) => {
    let classForLabel = 'input-section'

    switch (variant) {

        case 'file':
            classForLabel += ' root--input-file'
            return <InputFile label={label} className={classForLabel} onClick={onClick} {...rest} />

        case 'basic':
            return <InputBasic {...rest} />

        default:
            return (
                <>
                    <label className="wrapper-input default">
                        <input className="input-theme" {...rest} />
                    </label>
                </>
            )
    }

    
}

export default Input