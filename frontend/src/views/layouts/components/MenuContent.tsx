import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import {useSelector} from "react-redux";
import Link from "next/link";

const mainListItems = [
    {text: 'Dashboard', icon: <HomeRoundedIcon/>},
    {text: 'Statistics', icon: <AnalyticsRoundedIcon/>},
    {text: 'Promo', icon: <AddIcon/>},
    // {text: 'Players', icon: <PeopleRoundedIcon/>},
    {text: 'Finance', icon: <AttachMoneyIcon/>},
];

const secondaryListItems = [
    {text: 'Settings', icon: <SettingsRoundedIcon/>},
    {text: 'About', icon: <InfoRoundedIcon/>},
    {text: 'Feedback', icon: <HelpRoundedIcon/>},
];

export default function MenuContent() {
    const currentPageName = useSelector((state: any) => state?.settings?.currentPageName);

    return (
        <Stack sx={{flexGrow: 1, p: 1, justifyContent: 'space-between'}}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            component="a"
                            href={`/${item.text.toLowerCase()}`}
                            selected={currentPageName === item.text}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}
