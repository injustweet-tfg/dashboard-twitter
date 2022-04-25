import React, {useRef} from 'react';

import { useTheme } from '@mui/styles';
import { Card, CardHeader, Button, Box, Skeleton } from '@mui/material';
import ReactWordcloud from 'react-wordcloud';
import { saveSvgAsPng } from 'save-svg-as-png';

import Iconify from '../../Iconify';
import { useTweets } from '../../../context';


const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

function AppWordcloud() {
    const { getDataWordcloud, loading } = useTweets();
    const dataWordcloud = getDataWordcloud();
    const wordcloudRef = useRef();
    const theme = useTheme();

    const options = {
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
