import { Card, CardHeader, CardContent, Avatar, Container, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useFormik } from 'formik';
import { FilterSidebar } from '.';


// material




function AppHeader() {
    // const [tweets] = useContext(context);
    const [openFilter, setOpenFilter] = useState(false);

    const formik = useFormik({
        initialValues: {
            gender: '',
            category: '',
            colors: '',
            priceRange: '',
            rating: ''
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
        <Card>
            <CardHeader avatar={<Avatar sx={{ bgcolor: "blue" }} aria-label="logo">:)</Avatar>}
                title="Título" titleTypographyProps={{ variant: 'h2' }} />
            {/* {console.log(tweets)} */}
            <CardContent> Dashboard para la visualización de la cantidad de denuncias relacionadas con la precariedad laboral en España (o países hispanohablantes) recogidas a través de twitter</CardContent>
            <Container>

                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    <FilterSidebar
                        formik={formik}
                        isOpenFilter={openFilter}
                        onResetFilter={handleResetFilter}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                    />

                </Stack>
            </Container>
        </Card >
    );
}

export default AppHeader;
