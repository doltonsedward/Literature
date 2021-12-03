import { iconCollection } from '../../../assets'

// MUI component
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'

const SectionTwoDetailLiterature = ({ getter, setter, otherData, UIComponent, handler }) => {
    const { currentState } = otherData
    const { literature, collection } = getter
    const { Button, Typography } = UIComponent
    const { setOpenDialog } = setter
    const { handleCollection } = handler

    return (
        <div className="section-two">
            {
                literature.ownerLiterature?.fullName !== currentState.user.fullName ?
                <Button variant="contained" onClick={handleCollection}>
                    {
                        collection ?
                        <p>remove from collection <BookmarkRemoveIcon className="icon" /></p>
                        : 
                        <p>add to collection <img src={iconCollection} className="icon" alt="add to your collection" /></p>
                    } 
                </Button>
                : 
                literature.status === 'Cancel' ?
                <Button variant="outlined" className="button-delete" onClick={()=> setOpenDialog(true)}>
                    <p>delete literature</p>
                </Button>
                :
                <Button variant="outlined" className="button-author">
                    <p>you are the author</p>
                </Button>
            }
        </div>
    )
}

export default SectionTwoDetailLiterature
