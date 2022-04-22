
import React, { useState, useEffect } from "react";

export default function useFetch(uri) {
    const [tweets, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("useFetch useEffect"); // , loading ? "cargando" : "ya cargado");
        if (!uri) return;
        fetch(uri)
            .then(res => res.json()).then(setData)
            .then(() => setLoading(false)).catch(setError);
    }, [uri]);
    return {
        loading, tweets, error
    };
};