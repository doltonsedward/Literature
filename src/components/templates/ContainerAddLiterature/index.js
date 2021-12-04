import './AddLiterature.scss'
import { Input, Gap, DialogAddLiterature } from '../..'
import { pdfStyle } from '../../../assets'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

// MUI component
import { useTheme } from '@mui/material/styles';
import { 
    useMediaQuery,
    Button,
    Typography,
    Skeleton
} from "@mui/material"

const ContainerAddLiterature = ({ dataDialog, handler, form, preview }) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    const { handleChange, handleSubmit, handleAgree, handleDisagree, onDocumentLoadSuccess } = handler
    const { openDialog, setOpenDialog } = dataDialog
    const { title, pages, ISBN, author, attache } = form

    const submitButton = {
        float: 'right'
    }

    return (
        <div className="add-literature literature-default-padding">
            <Typography variant="h2" component="h1" style={{ fontSize: 36 }}>Add Literature</Typography>
            <Gap height={50} />
            <ul className="list-input">
                <li>
                    <Input name="title" value={title} onChange={handleChange} placeholder="Title" />
                </li>
                <li>
                    <Input type="date" name="publication_date" onChange={handleChange} placeholder="Publication Date" />
                </li>
                <li>
                    <Input type="number" name="pages" value={pages} onChange={handleChange} placeholder="Pages" />
                </li>
                <li>
                    <Input type="number" name="ISBN" value={ISBN} onChange={handleChange} placeholder="ISBN" />
                </li>
                <li>
                    <Input name="author" value={author} onChange={handleChange} placeholder="Author, ex: Doltons Ed, Astiana" />
                </li>
                <li>
                    <Input name="attache" variant="file" onChange={handleChange} />
                </li>
                <li>
                    {preview && (
                        <Document
                            file={attache[0]}
                            className={pdfStyle.pdfreader}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={<Skeleton variant="rectangular" width={200} height={270} />}
                        >
                            <Page 
                                pageNumber={1} 
                                renderTextLayer={false}
                            />
                        </Document>
                    )}
                </li>
            </ul>
            <Gap height={55} />
            <Button variant="contained" sx={submitButton} onClick={handleSubmit}>add literature</Button>
            <DialogAddLiterature 
                fullScreen={fullScreen} 
                open={openDialog} 
                setOpen={setOpenDialog} 
                onAgree={handleAgree} 
                onDisagree={handleDisagree}
            />
            <Gap height={77} />
        </div>
    )
}

export default ContainerAddLiterature
