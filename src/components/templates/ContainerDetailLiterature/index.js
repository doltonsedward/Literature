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
    
    const componentToChild = { Button, Typography }
    const getterToSectionOne = {
        pageNumber,
        numPages,
        literature
    }

    const handlerToSectionOne = {
        previousPage,
        nextPage,
        onDocumentLoadSuccess,
        download
    }

    const getterToSectionTwo = {
        collection,
        literature
    }

    const setterToSectionTwo = { setOpenDialog }
    const handlerToSectionTwo = { handleCollection }
    const dataToSectionTwo = { currentState }

    return (
        <>
            <Header />
            <div className="detail-literature literature-default-padding">
                <SectionOneDetailLiterature 
                    getter={getterToSectionOne}
                    handler={handlerToSectionOne}
                    containerClassName="section-one"
                    UIComponent={componentToChild}
                />
                <SectionTwoDetailLiterature 
                    getter={getterToSectionTwo} 
                    setter={setterToSectionTwo}
                    otherData={dataToSectionTwo}
                    UIComponent={componentToChild}
                    handler={handlerToSectionTwo}
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
