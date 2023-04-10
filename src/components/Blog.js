import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStyles } from './utils';
import Comment from './Comment';

const Blog = ({title, description,imageURL, userName, isUser, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`)
  };
  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:5000/api/blog/${id}`)
    .catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
  const handleDelete = (e) => {
    deleteRequest()
    .then(()=>navigate('/'))
    .then(()=>navigate('/blogs'));
  }
  // console.log(title, isUser)
  return (
    <div>
      {" "}
       <Card sx={{ width: '40%', margin:'auto', mt:2, padding:2, boxShadow: "5px 5px 10px #ccc", ":hover:":{
            boxShadow:"10px 10px 20px #ccc"
       }}}>

        {
          isUser && (
            <Box display='flex'>
              <IconButton onClick={handleEdit} sx ={{marginLeft: 'auto'}}>
                <ModeEditOutlineIcon color='warning'/>
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteForeverIcon color='error'/>
              </IconButton>
            </Box>
          )
        }
      <CardHeader
        avatar={
          <Avatar className={classes.font} sx={{ bgcolor: 'red' }} aria-label="recipe">
            {userName}
          </Avatar>
        }
        title={title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />
      <CardContent>
      <hr />
      <br />
        <Typography className={classes.font} variant="body2" color="text.secondary">
          <b>
            {userName} {": "} {description}
          </b>
          {description}
        </Typography>
      </CardContent>
      <Comment />
    </Card>
    </div>
  )
}

export default Blog
