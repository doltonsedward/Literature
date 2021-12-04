import './ContentSearchList.scss'
import { Gap, LoadingPDF } from "../.."
import { pdfStyle } from "../../../assets"
import { Link } from 'react-router-dom'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

// MUI component
import { Typography } from '@mui/material'

const ContentSearchList = ({ dataLiterature, handleChange, getLiterature }) => {
    return (
        <div className="content-search-list">
            <div className="year-option">
                <Typography variant="subtitle1" style={{ color: 'var(--secondary)', textAlign: 'center' }}>Anytime</Typography>
                <select name="public_year" id="publicYear" onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="2011">Since 2011</option>
                    <option value="2012">Since 2012</option>
                    <option value="2013">Since 2013</option>
                    <option value="2014">Since 2014</option>
                    <option value="2015">Since 2015</option>
                    <option value="2016">Since 2016</option>
                    <option value="2017">Since 2017</option>
                    <option value="2018">Since 2018</option>
                    <option value="2019">Since 2019</option>
                    <option value="2020">Since 2020</option>
                    <option value="2021">Since 2021</option>
                </select>
            </div>
            <div className="literatures">
                <ul>
                    {
                        dataLiterature.length ? 
                        dataLiterature.map((item, i) => {
                            return (
                                <li key={i}>
                                    <Link to={`/literature/${item.id}`} style={{ color: 'var(--text-color-primary)', textDecoration: 'none' }}>
                                        <Document
                                            file={item.attache}
                                            className={pdfStyle.pdfreader}
                                            loading={<LoadingPDF />}
                                        >
                                            <Page 
                                                pageNumber={1} 
                                                renderTextLayer={false}
                                            />
                                        </Document>
                                        
                                        <Gap height={18} />
                                        <p className="title-literature">{item.title}</p>
                                        <Gap height={15} />
                                        <div className="footer">
                                            <Typography variant="subtitle1" style={{ color: 'var(--subtitle)' }}>{item.author}</Typography>
                                            <Typography variant="subtitle1" style={{ color: 'var(--subtitle)' }}>{item.publication_date.split('-')[2]}</Typography>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                        :
                        <Typography variant="subtitle1" style={{ color: 'var(--subtitle)' }}>
                            we can't find what you're looking for, 
                            <span onClick={()=> getLiterature('all')} style={{ color: 'lightblue', cursor: 'pointer' }}> click here to see all</span>
                        </Typography>
                    }
                </ul>
            </div>
        </div>
    )
}

export default ContentSearchList
