import './TabsProfile.scss'
import React, { useState } from 'react'
import { BlankImage, ListOwnerLiterature, TabPanel } from '../..'

import { 
    Box,
    Tabs,
    Tab
} from '@mui/material'
import { Link } from 'react-router-dom'

const TabsProfile = ({ data }) => {
    const [value, setValue] = useState(0)

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    
    const filterWaiting = data.filter(item => item.status === 'Waiting')
    const filterApproval = data.filter(item => item.status === 'Approve')
    const filterCancel = data.filter(item => item.status === 'Cancel')

    // mui function
    const handleMuiChange = (event, newValue) => {
        setValue(newValue)
    }

    console.log(filterCancel)
    
    return (
        <Box className="tabs-profile">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleMuiChange} aria-label="basic tabs example">
                <Tab label="Waiting" {...a11yProps(0)} />
                <Tab label="Approve" {...a11yProps(1)} />
                <Tab label="Cancel" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {
                    data.length && filterWaiting.length ? 
                    <Link>
                        <ListOwnerLiterature data={filterWaiting} /> 
                    </Link>
                    : <BlankImage />
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {
                    data.length && filterApproval.length ?
                    <ListOwnerLiterature data={filterApproval} /> : <BlankImage />
                }
            </TabPanel>
            <TabPanel value={value} index={2}>
                {
                    data.length && filterCancel.length ?
                    filterCancel.map(item => {
                        return <Link to={`/literature/${item.id}`} style={{ color: 'var(--text-color-primary)', textDecoration: 'none' }}>
                                    <ListOwnerLiterature data={filterCancel}  /> 
                                </Link>  
                    })
                    : <BlankImage />
                }
            </TabPanel>
        </Box>
    )
}

export default TabsProfile
