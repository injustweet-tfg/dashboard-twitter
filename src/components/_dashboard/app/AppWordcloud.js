import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Button } from '@mui/material';
import ReactWordcloud from 'react-wordcloud';
// import randomize from 'randomize';
// import randomColor from 'randomcolor';
import { v4 as uuidv4 } from 'uuid';

const words = [
    {
        text: 'told',
        value: 50,
    },
    {
        text: 'mistake',
        value: 11,
    },
    {
        text: 'thought',
        value: 16,
    },
    {
        text: 'bad',
        value: 17,
    },
    {
        text: 'told',
        value: 64,
    },
    {
        text: 'mistake',
        value: 11,
    },
    {
        text: 'thought',
        value: 16,
    },
    {
        text: 'bad',
        value: 17,
    },
    {
        text: 'told',
        value: 50,
    },
    {
        text: 'mistake',
        value: 33,
    },
    {
        text: 'thought',
        value: 16,
    },
    {
        text: 'bad',
        value: 17,
    },
    {
        text: 'told',
        value: 64,
    },
    {
        text: 'mistake',
        value: 11,
    },
    {
        text: 'thought',
        value: 16,
    },
    {
        text: 'bad',
        value: 50,
    },
    {
        text: 'told',
        value: 64,
    },
    {
        text: 'mistake',
        value: 33,
    },
    {
        text: 'thought',
        value: 16,
    },
    {
        text: 'bad',
        value: 17,
    },
    {
        text: 'told',
        value: 64,
    },
    {
        text: 'mistake',
        value: 11,
    },
    {
        text: 'thought',
        value: 16,
    },
    {
        text: 'bad',
        value: 17,
    },
]

const fontFamilys = ['courier', 'serif', 'sans-serif'];

const options = {
    colors: ["#0000FF", "#00008B", "#ADD8E6", "#800080", "#808080", "#33C6FF"],
    enableTooltip: false,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
};



function AppWordcloud() {
    const [selectedWord, setSelectedWord] = useState(null);
    const [randomSeed, setRandomSeed] = useState(uuidv4());

    useEffect(() => {
        setInterval(() => {
            setRandomSeed(uuidv4());
            setSelectedWord();
        }, 10000);
    });

    return (
        <Card>
            <CardHeader title="Wordcloud" />
            <ReactWordcloud
                style={{ maxHeight: 300 }}
                options={options}
                words={words}
            />
        </Card>
    );
}

export default AppWordcloud;


/*
<Button
                onClick={() => {
                    setRandomSeed(uuidv4());
                    setSelectedWord();
                }}
            >
                Click me
            </Button>
*/