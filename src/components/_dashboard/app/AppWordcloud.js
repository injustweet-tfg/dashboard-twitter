import React, { useEffect, useState, useRef, Memo } from 'react';

// import { SaveIcon } from '@mui/icons-material/Save';
import { Card, CardHeader, Button, Box } from '@mui/material';
import ReactWordcloud from 'react-wordcloud';
import { saveSvgAsPng } from 'save-svg-as-png';
// import randomize from 'randomize';
// import randomColor from 'randomcolor';
import { v4 as uuidv4 } from 'uuid';
import Iconify from '../../Iconify';

const fontFamilys = ['courier', 'serif', 'sans-serif'];
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const options = {
    colors: ["#0000FF", "#00008B", "#ADD8E6", "#800080", "#808080", "#33C6FF"],
    enableTooltip: true,
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



function AppWordcloud({ dataWordcloud }) {
    const wordcloudRef = useRef();

    const [update, setUpdate] = useState(uuidv4());

    return (
        <Card>
            <CardHeader title="Wordcloud" />
            <Box ref={wordcloudRef}>
                <ReactWordcloud
                    style={{ maxHeight: 300 }}
                    options={options}
                    maxWords={40}
                    words={dataWordcloud}
                />
            </Box>
            <Button
                onClick={() => {
                    setUpdate(uuidv4());
                }}
            >
                Animar
            </Button>

            <Button
                startIcon={getIcon('fluent:save-24-filled')}
                onClick={() => {
                    const svgElement = wordcloudRef.current.querySelector('svg');
                    saveSvgAsPng(svgElement, 'wordcloud.png');
                }} />

        </Card>
    );
}

export default AppWordcloud;

/*
useEffect(() => {
        setInterval(() => {
            setRandomSeed(uuidv4());
            setSelectedWord();
        }, 10000);
    });
    

    <Button
                onClick={() => {
                    setRandomSeed(uuidv4());
                    setSelectedWord();
                }}
            >
                Animar
            </Button>

            useEffect(() => {
  const interval = setInterval(() => {
    console.log('This will run every second!');
  }, 1000);
  return () => clearInterval(interval);
}, []);
*/
