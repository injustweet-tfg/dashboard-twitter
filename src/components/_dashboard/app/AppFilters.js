import { Stack, Typography, Container, Grid } from '@mui/material';
import React, { useState } from 'react'
import FilterSidebar from './FilterSidebar';

export default function AppFilters() {
    const [openFilter, setOpenFilter] = useState(false);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'start', sm: 'center' }} justifyContent="space-between" mb={3}>
            <Typography variant="h3" gutterBottom>
                Visualización de denuncias laborales
            </Typography>

            <FilterSidebar
                isOpenFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
            />
        </Stack>


    );


}
