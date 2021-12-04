import './DetailLiterature.scss'
import { DialogDetailLiterature, Header, SectionOneDetailLiterature } from '../../'

// MUI component
import { Button, Typography } from '@mui/material'
import { SectionTwoDetailLiterature } from '../../organism'

const ContainerDetailLiterature = ({ otherData, dataDialog, handler, getter }) => {    
    const { literature, inputMakeSure, numPages, pageNumber, collection } = getter
    const { currentState, author } = otherData
    const { openDialog, setOpenDialog } = dataDialog
    const { previousPage, nextPage, download, onDocumentLoadSuccess, onAgree,  onDisagree, handleCheckInput, handleCollection } = handler

    return (
        <>
            <Header />
            <div className="detail-literature literature-default-padding">
                <SectionOneDetailLiterature 
                    containerClassName="section-one"
                    handler={{ previousPage, nextPage, onDocumentLoadSuccess, download }}
                    getter={{ pageNumber, numPages, literature }}
                    UIComponent={{ Button, Typography }}
                />
                <SectionTwoDetailLiterature 
                    containerClassName="section-two"
                    handler={{ handleCollection }}
                    getter={{ collection, literature }} 
                    setter={{ setOpenDialog }}
                    otherData={{ currentState }}
                    UIComponent={{ Button }}
                />
            </div>
            <DialogDetailLiterature 
                author={author}
                open={openDialog}
                setOpen={setOpenDialog}
                onAgree={onAgree}
                onDisagree={onDisagree}
                onCheckInput={handleCheckInput}
                inputMakeSure={inputMakeSure}
            />
        </>
    )
}

export default ContainerDetailLiterature
