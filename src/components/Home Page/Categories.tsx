import React from 'react'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'

import { useAppSelector } from '../../hooks/useAppSelector'

const Categories = () => {
    const { categories } = useAppSelector(state => state.productsReducer);
  return (
    <div>
        <ImageList sx={{ width: 'md', height: 300, display: 'flex' }}>
            <ImageListItem key="Subheader">
            </ImageListItem>
            {categories.map((item) => (
                <ImageListItem key={item.id}>
                <img
                    src={`${item.image}`}
                    alt={item.name}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={item.name}
                />
                </ImageListItem>
            ))}
        </ImageList>
    </div>
  )
}

export default Categories