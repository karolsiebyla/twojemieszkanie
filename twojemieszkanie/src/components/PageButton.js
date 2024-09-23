import React from 'react';
import {useNavigate} from "react-router-dom";

function PageButton ({ buttonText, navigateTo }) {

    const navigate = useNavigate();

    const goToNextPage = () => {
        navigate(navigateTo);
    }

    return (
        <div className="nextPage">
            <div className="nextPage__button">

                <button onClick={goToNextPage}>{buttonText}</button>

            </div>
        </div>
    );
}

export default PageButton