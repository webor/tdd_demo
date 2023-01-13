import React from "react";
import loader from '../../svg/loader.svg';

const Loader = () => {
    return <img style={{ zIndex: 10 }} src={loader} className="app-loader" alt="loader" />
}

export default Loader;