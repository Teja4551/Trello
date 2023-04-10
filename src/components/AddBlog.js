import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStyles } from './utils';

const labelStyles = { mb: 1, mt: 2, fontSizw: '24px', fontWeight: 'bold' }
const AddBlog = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: ""
  });
  const handleChange = (e) =>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const sendRequest = async () =>{
    const res = await axios.post("http://localhost:5000/api/blog/add", {
      title: inputs.title,
      description: inputs.description,
      image: inputs.imageURL,
      user: localStorage.getItem('userId')
    })
    .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }
  const handleSubmit = (e) =>{
    e.preventDefault(); 
    console.log(inputs);
    sendRequest().then((data)=>console.log(data)).then(()=>navigate('/blogs'));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3}
          borderColor='radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
          borderRadius={10}
          boxShadow='10px 10px 20px #ccc'
          padding={3}
          marginTop={3}
          margin={'auto'}
          display='flex'
          flexDirection={'column'}
          width={"80%"}
        >
          <Typography 
          className={classes.font}
          fontWeight={'bold'} 
          padding={3} 
          color='greay' 
          variant='h2' 
          textAlign={'center'}>
            Post your blog
          </Typography>
          <InputLabel  className={classes.font} sx={labelStyles}>Title</InputLabel>
          <TextField className={classes.font} name = 'title' onChange={handleChange} value={inputs.title} margin='auto' variant="outlined" />
          <InputLabel className={classes.font} sx={labelStyles}>description</InputLabel>
          <TextField className={classes.font} name = 'description' onChange={handleChange} value={inputs.description} margin='auto' variant="outlined" />
          <InputLabel className={classes.font} sx={labelStyles}>imageURL</InputLabel>
          <TextField className={classes.font} name = 'imageURL' onChange={handleChange} value={inputs.imageURL } margin='auto' variant="outlined" />
          <Button sx={{mt:2, borderRadius:4}} variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
    </div>);
}

export default AddBlog
