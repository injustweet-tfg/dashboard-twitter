import { Typography, TextField } from '@mui/material';
// Grid, Button, Container, Stack, 
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

export default function AppFilters() {
    return <div>
        <Typography variant="h3" gutterBottom>
            Observa la precariedad laboral
        </Typography>

        <TextField
            id="date"
            label="Inicio"
            type="date"
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
            InputLabelProps={{
                shrink: true,
            }}
        />
        <TextField
            id="date"
            label="Fin"
            type="date"
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
            InputLabelProps={{
                shrink: true,
            }}
        />


    </div>;
}
