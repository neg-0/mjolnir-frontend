import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';

export default function FavoriteButton({ templateId, favorites, toggleFavorite }) {

    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        if (!favorites) {
            return
        }
        setIsFavorite(favorites.includes(templateId))

    }, [templateId, favorites])

    return <Button onClick={(e) => toggleFavorite(templateId)} >< FavoriteIcon sx={{ color: isFavorite ? '#FFD433' : '#1976d2' }} /></Button>

}