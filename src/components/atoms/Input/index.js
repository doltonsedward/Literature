import { Gap } from '..';
import { iconFile } from '../../../assets';
import './_Input.scss';

const InputFile = ({label, className, onClick, ...rest}) => {
    return (
        <>
            <label className="wrapper-input-file">
                <p style={{fontWeight: 800}}>{label}</p>
                <div className={className}>
                    <button className="input-theme">
                        Attach here
                        <Gap width={45} />
                        <img width="20px" src={iconFile} alt="drop your file here" />
                        <input type="file" className="input-theme" {...rest} onClick={onclick} />
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

const InputField = ({...rest}) => {
    return (
        <label className="wrapper-input default">
            <textarea style={{ height: 80 }} {...rest} />
        </label>
    )
}

const Input = ({label, variant, onClick, ...rest}) => {
    switch (variant) {

        case 'file':
            return <InputFile label={label} onClick={onClick} {...rest} />

        case 'basic':
            return <InputBasic {...rest} />

        case 'field':
            return (
                <label className="wrapper-input default">
                    <InputField className="input-theme" {...rest} />
                </label>
            )

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