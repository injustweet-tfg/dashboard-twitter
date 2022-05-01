import PropTypes from 'prop-types';
import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import {
    Box,
    Stack,
    Button,
    Drawer,
    Divider,
    TextField,
    IconButton,
    Typography,
    FormControl,
} from '@mui/material';
//
import esLocale from 'date-fns/locale/es';
import { Icon } from '@iconify/react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useTweets } from '../../../context';
import Scrollbar from '../../Scrollbar';


// ----------------------------------------------------------------------

FilterSidebar.propTypes = {
    isOpenFilter: PropTypes.bool,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,

};

const ButtonStyled = styled(Button)(({ theme }) => ({
    '&.active': {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
    }

}));

export default function FilterSidebar({
    isOpenFilter,
    onOpenFilter,
    onCloseFilter,
}) {
    const { filterTime } = useTweets();

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [filterOn, setFilterOn] = useState('');

    const handleFilterOn = (newFilter) => {
        if (newFilter !== null) {
            setFilterOn(newFilter);
        }
    };

    const handleResetFilter = () => {
        setStart(null);
        setEnd(null);
        setFilterOn('');
    };

    return (
        <Stack direction="column">
            <Button
                disableRipple
                // variant="outlined"
                endIcon={<Icon icon="bi:calendar2-date" width={20} height={20} />}
                onClick={onOpenFilter}
            >
                Filtra por fecha las denuncias
            </Button>
            <FormControl>
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
                        sx={{ px: 1, py: 1 }}
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
                        <Stack spacing={2} sx={{ p: 2 }}>
                            <ButtonStyled
                                className={filterOn === 'week' ? 'active' : ''}
                                fullWidth
                                size="large"
                                color="primary"
                                variant="outlined"
                                onClick={() => {
                                    filterTime((Date.now() - 86400000 * 7).toString(),)
                                    handleFilterOn('week');
                                }}
                            >
                                Últimos 7 días
                            </ButtonStyled>
                            <ButtonStyled
                                className={filterOn === 'month' ? 'active' : ''}
                                fullWidth
                                size="large"
                                color="primary"
                                variant="outlined"
                                onClick={() => {
                                    filterTime((Date.now() - 86400000 * 31).toString(),)
                                    handleFilterOn('month');
                                }}
                            >
                                Último mes
                            </ButtonStyled>
                            <ButtonStyled
                                className={filterOn === 'year' ? 'active' : ''}
                                fullWidth
                                size="large"
                                color="primary"
                                variant="outlined"
                                onClick={() => {
                                    filterTime((Date.now() - 86400000 * 365).toString(),);
                                    handleFilterOn('year');
                                }}
                            >
                                Último año
                            </ButtonStyled>

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
                                color="success"
                                variant="outlined"
                                sx={{ color: 'success.main' }}
                                startIcon={<Icon icon="line-md:confirm-circle" width={20} height={20} />}
                                onClick={() => {
                                    filterTime(start != null ? start.getTime().toString() : '0',
                                        end != null ? end.getTime().toString() : Date.now().toString());
                                    // filterTime(start, end);
                                    handleFilterOn('');
                                    // onCloseFilter();
                                }
                                }
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
                            color="secondary"
                            variant="outlined"
                            sx={{ color: 'secondary.main' }}
                            startIcon={<Icon icon="bi:trash" width={20} height={20} />}
                            onClick={() => {
                                filterTime();
                                handleResetFilter();
                            }
                            }
                        >
                            Borrar filtros
                        </Button>
                    </Box>
                </Drawer>
            </FormControl>
        </Stack>
    );
}
