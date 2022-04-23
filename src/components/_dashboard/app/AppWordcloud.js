import React, { useEffect, useState, useRef, Memo } from 'react';

// import { SaveIcon } from '@mui/icons-material/Save';
import { useTheme } from '@mui/styles';
import { Card, CardHeader, Button, Box, Skeleton } from '@mui/material';
import ReactWordcloud from 'react-wordcloud';
import { saveSvgAsPng } from 'save-svg-as-png';
// import randomize from 'randomize';
// import randomColor from 'randomcolor';
import { v4 as uuidv4 } from 'uuid';
import Iconify from '../../Iconify';
import { useTweets } from '../../../context';

const fontFamilys = ['courier', 'serif', 'sans-serif'];
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

function AppWordcloud() {
    const { getDataWordcloud, loading } = useTweets();
    const dataWordcloud = getDataWordcloud();
    const wordcloudRef = useRef();
    const theme = useTheme();

    const options = {
        // colors: ["#0000FF", "#00008B", "#ADD8E6", "#800080", "#808080", "#33C6FF"],
        colors: theme.palette.chart.wordcloud,
        enableTooltip: false,
        deterministic: false,
        fontFamily: "impact",
        fontSizes: [15, 60],
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 1,
        rotations: 3,
        rotationAngles: [0, 90],
        scale: "sqrt",
        spiral: "archimedean",
        transitionDuration: 1000
    };

    return (
        <Card>
            <CardHeader title="Palabras más usadas"
                action={<Button
                    endIcon={getIcon('fluent:save-24-filled')}
                    onClick={() => {
                        const svgElement = wordcloudRef.current.querySelector('svg');
                        saveSvgAsPng(svgElement, 'wordcloud.png');
                    }}>
                    Descargar
                </Button>}
            />
            <Box ref={wordcloudRef}>
                {loading ?
                    <Skeleton sx={{ height: 300 }} variant="rectangular" />
                    :
                    <ReactWordcloud
                        style={{ maxHeight: 300 }}
                        options={options}
                        maxWords={40}
                        words={dataWordcloud}
                    />}
            </Box>
        </Card>
    );
}

export default AppWordcloud;
