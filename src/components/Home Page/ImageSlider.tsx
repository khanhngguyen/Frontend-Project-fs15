import React, { useState } from 'react'
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material';
import { Box, IconButton, Pagination, Stack } from '@mui/material';

const ImageSlider = () => {
    const [index, setIndex] = useState(0);
    const sliderStyles = {
        height: '600px',
        width: 'lg',
        position: 'relative'
    }
    const slideStyles = {
        width: 'lg',
        height: '600px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${imagesData[index].url})`,
        position: 'relative',
        overflowY: 'scroll'
    }
    const prevArrowStyles = {
        position: 'abosolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: '20px',
        color: 'white',
        zIndex: 1,
        cursor: 'pointer'
    }
    const nextArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '20px',
        color: 'white',
        zIndex: 1,
        cursor: 'pointer'
    }
    const toPrevImage = () => {
        const isFirstIndex = index === 0;
        const newIndex = isFirstIndex ? imagesData.length - 1 : index - 1;
        setIndex(newIndex);
    }
    const toNextImage = () => {
        const isLastIndex = index === imagesData.length - 1;
        const newIndex = isLastIndex ? 0 : index + 1;
        setIndex(newIndex);
    }
    const toSpecficImage = (event: React.ChangeEvent<unknown>, value: number) => {
        setIndex(value - 1);
    }

  return (
    <div>
        <Box
            // sx={{ width: 'lg', height: 600 }}
            sx={sliderStyles}
        >
            <Box sx={slideStyles}>
                <IconButton
                    sx={prevArrowStyles}
                    onClick={toPrevImage}
                >
                    <ArrowBackIosRounded />
                </IconButton>
                <IconButton
                    sx={nextArrowStyles}
                    onClick={toNextImage}
                >
                    <ArrowForwardIosRounded />
                </IconButton>
            </Box>
        </Box>
        <Stack spacing={2} alignItems='center' margin='10px auto'>
            <Pagination count={imagesData.length} page={index + 1} size="small" onChange={toSpecficImage} />
        </Stack>
    </div>
  )
}

export default ImageSlider;

const imagesData = [
    {
        url: 'https://images.pexels.com/photos/16434341/pexels-photo-16434341/free-photo-of-wood-love-summer-leaf.jpeg',
        title: 'wood love summer leaf'
    },
    {
        url: 'https://images.pexels.com/photos/8329677/pexels-photo-8329677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'matcha drink',
    },
    {
        url: 'https://images.pexels.com/photos/16658768/pexels-photo-16658768/free-photo-of-retro-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'retro camera',
    },
    {
        url: 'https://images.pexels.com/photos/1828875/pexels-photo-1828875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'orange tabby cat on back of window curtain',
    },
    {
        url: 'https://images.pexels.com/photos/10752138/pexels-photo-10752138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'pouring milk into coffee',
    },
    {
        url: 'https://images.pexels.com/photos/15577371/pexels-photo-15577371/free-photo-of-facade-of-sidewalk-cafe.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'facade of sidewalk cafe',
    },
    {
        url: 'https://images.pexels.com/photos/9362362/pexels-photo-9362362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'lemons and herbs',
    },
    {
        url: 'https://images.pexels.com/photos/16660875/pexels-photo-16660875/free-photo-of-person-working-in-food-bar.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'food bar',
    },
    {
        url: 'https://images.pexels.com/photos/1741206/pexels-photo-1741206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'cat with red scarf sitting on white stool',
    },
]
