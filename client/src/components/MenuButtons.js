import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FunctionsIcon from '@mui/icons-material/Functions';
import FilledInput from '@mui/material/FilledInput';
import SortIcon from '@mui/icons-material/Sort';
import Toolbar from '@mui/material/Toolbar';



export default function MenuButtons() {
    return(
        <div id="menu-buttons">
            <Toolbar>
            <IconButton
            size="large">
                <HomeOutlinedIcon 
                fontSize="large"/>
            </IconButton>
            <IconButton
            size="large">
                <GroupOutlinedIcon 
                fontSize="large"/>
            </IconButton>
            <IconButton
            size="large">
                <PersonOutlineIcon 
                fontSize="large"/>
            </IconButton>
            <IconButton
            size="large">
                <FunctionsIcon 
                fontSize="large"/>
            </IconButton>
            <FilledInput 
                autoComplete
                placeholder="Search"
                color="secondary"/>
            <Typography                        
                        variant="h8"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >SORT BY</Typography>
            <IconButton
            size="large"
            edge="end">
                <SortIcon 
                fontSize="large"/>
            </IconButton>
            </Toolbar>
        </div>
    )
}

