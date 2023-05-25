import React from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { ArrowRightAlt } from '@mui/icons-material'

import MansoryImageList from '../components/Home Page/MansoryImageList'
import ImageSlider from '../components/Home Page/ImageSlider'

const Home = () => {
  return (
    <div>
      <Typography variant='h5' align='center'>About us</Typography>
      <Typography align='center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aut optio, vitae, blanditiis est perspiciatis animi praesentium dolores esse omnis accusamus obcaecati in officia aperiam rem distinctio illum incidunt ut. Voluptatem atque provident non corporis, natus perferendis et iure veritatis.
      </Typography>
      <MansoryImageList />
      <Typography variant='h5' align='center'>Check out our most popular products</Typography>
      <ImageSlider />
      <Box textAlign='center'>
        <Typography variant='h5' align='center'>Browse all products</Typography>
        <Button
          variant='outlined'
          href='/products'
        >
          To all products page
          <IconButton><ArrowRightAlt color='primary' /></IconButton>
        </Button>
      </Box>
      <Typography variant='h5' align='center'>
        Or browse by categories
      </Typography>
    </div>
  )
}

export default Home