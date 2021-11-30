import { LoadingPDF } from '../..'
import { pdfStyle } from '../../../assets'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { Typography } from '@mui/material'

const ListOwnerLiterature = ({ data }) => {
    return (
        <ul className="list-owner-literature">
            {data?.map((item, i) => {
                return (
                    <li key={i}>
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
                        <Typography variant="h2" component="h2" className="title">{item.title}</Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1" component="p" className="body">{item.author}</Typography>
                            <Typography variant="subtitle1" component="p" className="body">{item.publication_date}</Typography>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default ListOwnerLiterature
