import React, { useEffect, useState, useRef, useMemo } from 'react';

import { Card, CardHeader, Button, Box } from '@mui/material';
import ReactWordcloud from 'react-wordcloud';
import { saveSvgAsPng } from 'save-svg-as-png';
// import randomize from 'randomize';
// import randomColor from 'randomcolor';
import { v4 as uuidv4 } from 'uuid';


const fontFamilys = ['courier', 'serif', 'sans-serif'];

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



function AppWordcloud({dataWordcloud}) {
    const [words, setWords] = useState(dataWordcloud);
    const wordcloudRef = useRef();

    const [selectedWord, setSelectedWord] = useState(null);
    const [randomSeed, setRandomSeed] = useState(uuidv4());

    // const [content, setContent] = useState(initialContent);
    // const words = useMemo(() => tokenizeWords(content), [content]);

    return (
        <Card>
            <CardHeader title="Wordcloud" />
            <Box ref={wordcloudRef}>
                <ReactWordcloud
                    style={{ maxHeight: 300 }}
                    options={options}
                    maxWords={20}
                    words={words}
                />
            </Box>
            <Button
                onClick={() => {
                    setRandomSeed(uuidv4());
                    setSelectedWord();
                }}
            >
                Animar
            </Button>
            <Button onClick={() => {
                const svgElement = wordcloudRef.current.querySelector('svg');
                saveSvgAsPng(svgElement, 'wordcloud.png');
            }} >
                Guardar
            </Button>
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
    
*/
