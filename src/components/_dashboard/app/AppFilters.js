import { Stack, Typography, } from '@mui/material';
import React, { useState } from 'react'
import { useFormik } from 'formik';
import { FilterSidebar } from '.';

export default function AppFilters() {
    const [openFilter, setOpenFilter] = useState(false);

    const formik = useFormik({
        initialValues: {
            start: '',
            end: ''
        },
        onSubmit: () => {
            setOpenFilter(false);
        }
    });

    const { resetForm, handleSubmit } = formik;

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleResetFilter = () => {
        handleSubmit();
        resetForm();
    };
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'start', sm: 'center' }} justifyContent="space-between" mb={3}>
            <Typography variant="h3" gutterBottom>
                Visualización de denuncias laborales en Twitter
            </Typography>
            <FilterSidebar
                formik={formik}
                isOpenFilter={openFilter}
                onResetFilter={handleResetFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
            />
        </Stack>

    );


}
