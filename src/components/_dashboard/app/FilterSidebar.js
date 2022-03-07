import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form, FormikProvider } from 'formik';
// material
import {
    Box,
    Radio,
    Stack,
    Button,
    Drawer,
    Rating,
    Divider,
    Checkbox,
    FormGroup,
    TextField,
    IconButton,
    Typography,
    RadioGroup,
    FormControlLabel
} from '@mui/material';
//
import esLocale from 'date-fns/locale/es';
import { Icon } from '@iconify/react';
import commentOutlined from '@iconify/icons-ant-design/comment-outlined';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Scrollbar from '../../Scrollbar';


// ----------------------------------------------------------------------

export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
    { value: 'below', label: 'Below $25' },
    { value: 'between', label: 'Between $25 - $75' },
    { value: 'above', label: 'Above $75' }
];
export const FILTER_COLOR_OPTIONS = [
    '#00AB55',
    '#000000',
    '#FFFFFF',
    '#FFC0CB',
    '#FF4842',
    '#1890FF',
    '#94D82D',
    '#FFC107'
];

// ----------------------------------------------------------------------

FilterSidebar.propTypes = {
    isOpenFilter: PropTypes.bool,
    onResetFilter: PropTypes.func,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
    formik: PropTypes.object
};

export default function FilterSidebar({
    isOpenFilter,
    onResetFilter,
    onOpenFilter,
    onCloseFilter,
    formik
}) {
    const { values, getFieldProps, handleChange } = formik;
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    return (
        <Stack direction="column">
            <Button
                disableRipple
                color="inherit"
                endIcon={<Icon icon="bi:calendar2-date" width={20} height={20} />}
                onClick={onOpenFilter}
            >
                Filtra por fecha las denuncias
            </Button>

            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate>
                    <Drawer
                        anchor="right"
                        open={isOpenFilter}
                        onClose={onCloseFilter}
                        PaperProps={{
                            sx: { width: 280, border: 'none', overflow: 'hidden' }
                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ px: 1, py: 2 }}
                        >
                            <Typography variant="subtitle1" sx={{ ml: 1 }}>
                                Filtros
                            </Typography>
                            <IconButton onClick={onCloseFilter}>
                                <Icon icon="akar-icons:cross" width={20} height={20} />
                            </IconButton>
                        </Stack>

                        <Divider />

                        <Scrollbar>
                            <Stack spacing={3} sx={{ p: 3 }}>
                                <Button
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    color="primary"
                                    variant="outlined"
                                >
                                    Últimos 7 días
                                </Button>
                                <Button
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    color="primary"
                                    variant="outlined"
                                >
                                    Último mes
                                </Button>
                                <Button
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    color="primary"
                                    variant="outlined"
                                >
                                    Último año
                                </Button>

                                <div>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Fecha de inicio
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
                                        <DatePicker
                                            value={start}
                                            onChange={(newValue) => {
                                                setStart(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />

                                        <Typography variant="subtitle1" gutterBottom>
                                            Fecha de fin
                                        </Typography>
                                        <DatePicker
                                            value={end}
                                            onChange={(newValue) => {
                                                setEnd(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />

                                    </LocalizationProvider>
                                </div>

                                <Button
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    color="success"
                                    variant="contained"
                                    endIcon={<Icon icon="line-md:confirm-circle" width={20} height={20} />}
                                >
                                    Confirmar
                                </Button>

                            </Stack>
                        </Scrollbar>
                        <Divider />
                        <Box sx={{ p: 3 }}>
                            <Button
                                fullWidth
                                size="large"
                                type="submit"
                                color="secondary"
                                variant="contained"
                                onClick={onResetFilter}
                                startIcon={<Icon icon="bi:trash" width={20} height={20} />}
                            >
                                Borrar filtros
                            </Button>
                        </Box>
                    </Drawer>
                </Form>
            </FormikProvider>
        </Stack>
    );
}
