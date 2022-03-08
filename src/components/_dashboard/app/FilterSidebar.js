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
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

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
                                    variant="outlined"
                                    sx={{ color: 'success.main' }}
                                    startIcon={<Icon icon="line-md:confirm-circle" width={20} height={20} />}
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
                                variant="outlined"
                                onClick={onResetFilter}
                                sx={{ color: 'secondary.main' }}
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
