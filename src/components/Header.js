import React, { useState } from 'react'
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material'
// import { color } from '@mui/system'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store'
import { useStyles } from './utils';

const Header = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <AppBar
      position='sticky'
      sx={{ background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)' }}>
      <Toolbar>
        <Typography classes={classes.font} variant="h4">BlogsApp</Typography>
        {isLoggedIn && <Box display="flex" marginLeft={'auto'}>
          <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
            <Tab classes={classes.font} LinkComponent={Link} to="/blogs" label="All Blogs" />
            <Tab classes={classes.font} LinkComponent={Link} to="/myBlogs" label="My Blogs" />
            <Tab classes={classes.font} LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
          </Tabs>
        </Box>}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && <>  <Button LinkComponent={Link} to="/auth" variant='contained' sx={{ margin: 1, borderRadius: 10 }} color="warning">Login</Button>
            <Button LinkComponent={Link} to="/auth" variant='contained' sx={{ margin: 1, borderRadius: 10 }} color="warning">Sign up</Button></>}
          
          {isLoggedIn && 
          <Button 
          onClick={()=> dispath(authActions.logout())}
          LinkComponent={Link} to="/auth" 
          variant='contained' 
          sx={{ margin: 1, borderRadius: 10 }} 
          color="warning">Log Out</Button>
          }

        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
