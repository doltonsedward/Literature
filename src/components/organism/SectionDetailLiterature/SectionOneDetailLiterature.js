import { ListDetailLiterature } from '../..'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

// PDF render
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

const SectionOneDetailLiterature = ({ getter, handler, containerClassName, UIComponent }) => {
    const { pageNumber, numPages, literature } = getter
    const { previousPage, nextPage, onDocumentLoadSuccess, download } = handler
    const { Button, Typography } = UIComponent

    return (
        <div className={containerClassName}>
            <div className="wrapper-pdf">
                <div className="button-pages" onClick={(e)=> e.stopPropagation()}>
                    <div className="inner-button-pages">
                        <Button 
                            variant="contained"
                            className="prev-button btn"
                            disabled={pageNumber <= 1} 
                            onClick={previousPage}
                        >
                            <KeyboardArrowLeftIcon />
                        </Button>
                        <Typography variant="subtitle1" component="span" className="detail">
                            {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                        </Typography>
                        <Button
                            variant="contained"
                            className="next-button btn"
                            disabled={pageNumber >= numPages}
                            onClick={nextPage}
                        >
                            <KeyboardArrowRightIcon />
                        </Button>
                    </div>
                </div>
                {literature?.attache && (
                    <Document
                        file={literature.attache}
                        onLoadSuccess={onDocumentLoadSuccess}
                        options={{ workerSrc: "/pdf.worker.js" }}
                        className="pdf-reader"
                    >
                        <Page 
                            pageNumber={pageNumber} 
                            renderTextLayer={false}
                        />
                    </Document>
                )}
            </div>
            <ListDetailLiterature 
                data={literature}
                onDownload={download}
                numPages={numPages}
            />
        </div>
    )
}

export default SectionOneDetailLiterature
