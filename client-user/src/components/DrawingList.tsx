import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from './redux/Store';
import { Typography, Box, Grid, Button } from '@mui/material';
import { fetchAllDrawings, fetchDrawingsByCategory, searchDrawings } from './redux/DrawingSlice';
import DrawingCard from './DrawingCard';

const DrawingList: React.FC<{ searchTerm: string; selectedCategory?: number | null }> = ({ searchTerm, selectedCategory }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { drawings, status, error } = useSelector((state: RootStore) => state.drawings);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [isDefaultView, setIsDefaultView] = useState(true); // חדש

  useEffect(() => {
    const loadDrawings = async () => {
      try {
        if (searchTerm) {
          setIsDefaultView(false);
          await dispatch(searchDrawings(searchTerm));
        } else if (selectedCategory) {
          setIsDefaultView(false);
          await dispatch(fetchDrawingsByCategory(selectedCategory));
        } else {
          setIsDefaultView(true);
          await dispatch(fetchAllDrawings());
        }
        setInitialLoadComplete(true);
      } catch (err) {
        setInitialLoadComplete(true);
      }
    };

    loadDrawings();
  }, [dispatch, searchTerm, selectedCategory]);

  const handleReload = async () => {
    setIsDefaultView(true);
    await dispatch(fetchAllDrawings());
  };

  const visibleDrawings = useMemo(() => {
    return isDefaultView ? drawings.slice(0, 12) : drawings;
  }, [drawings, isDefaultView]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <Typography variant="h6" sx={{ color: '#6a5acd' }}>טוען ציורים...</Typography>
      </Box>
    );
  }

  if (initialLoadComplete && visibleDrawings.length === 0) {
    return (
      <Box sx={{
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        height: '400px', backgroundColor: '#f0f0f0',
        margin: '20px', borderRadius: '15px',
        padding: '20px', textAlign: 'center'
      }}>
        <Typography variant="h4" sx={{ color: '#6a5acd', marginBottom: 2, fontWeight: 'bold' }}>
          אין ציורים להצגה 🎨
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#666', marginBottom: 3, maxWidth: '500px' }}>
          {searchTerm ? `לא מצאנו ציורים התואמים לחיפוש "${searchTerm}"` : selectedCategory ? 'לא נמצאו ציורים בקטגוריה זו' : 'לא נמצאו ציורים תואמים'}
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: '#6a5acd', '&:hover': { backgroundColor: '#5a4abf' } }} onClick={handleReload}>
          טען ציורים מחדש
        </Button>
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box sx={{
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        height: '300px', backgroundColor: '#ffebee',
        margin: '20px', borderRadius: '15px'
      }}>
        <Typography variant="h5" color="error" sx={{ textAlign: 'center', marginBottom: 2 }}>
          שגיאה בטעינת ציורים
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', textAlign: 'center', marginBottom: 2 }}>
          {error || 'התרחשה שגיאה בלתי צפויה'}
        </Typography>
        <Button variant="contained" color="error" onClick={handleReload}>
          נסה שוב
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 3, pb: 4 }}>
      <Grid container spacing={2}>
        {visibleDrawings.map((drawing: any) => (
          <DrawingCard drawing={drawing} key={drawing.id} />
        ))}
      </Grid>
    </Box>
  );
};

export default DrawingList;
