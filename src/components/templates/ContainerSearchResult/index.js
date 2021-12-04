import './SearchResult.scss'

import { iconSearch } from '../../../assets'
import { ContentSearchList, Gap, Input } from '../../'

// MUI component
import { Button } from '@mui/material'

const ContainerSearchResult = ({ fetching, handler, getter }) => {
    const { getLiterature } = fetching
    const { handleChange, handleSearch } = handler
    const { dataLiterature, inputData } = getter

    return (
        <div className="search-result literature-default-padding">
            <div className="wrapper-search-list">
                <div className="wrapper-input-autocomplete">
                    <Input style={{ width: 600, height: 50 }} name="title" value={inputData.title} list="literature" onChange={handleChange} placeholder="Search for literature" />
                    <datalist id="literature" style={{ height: 200, overflow: 'hidden' }}>
                        {dataLiterature.map((item, i) => {
                            return <option key={i} value={item.title} />
                        })}
                    </datalist>
                </div>
                <Button onClick={handleSearch}><img src={iconSearch} alt="button for searching list book" /></Button>
            </div>
            <Gap height={51} />
            <ContentSearchList 
                dataLiterature={dataLiterature} 
                handleChange={handleChange}
                getLiterature={getLiterature}
            />
        </div>
    )
}

export default ContainerSearchResult
