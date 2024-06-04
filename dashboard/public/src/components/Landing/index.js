import React, {useRef, useEffect, useState, Fragment} from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-toastify/dist/ReactToastify.css';

const Landing = () => {

    const [btn, setBtn] = useState(false);
    const refWolverine = useRef(null)
    
    useEffect(() => {
        setTimeout(() => {
            setBtn(true)
        }, 1000);

    }, [])

    const setLeftImg = () => {
    }

    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg");
    }

    const clearImg = () => {
        if(refWolverine.current.classList.contains("leftImg")) {
            refWolverine.current.classList.remove("leftImg");
        } else if (refWolverine.current.classList.contains("rightImg")) {
            refWolverine.current.classList.remove("rightImg")
        }
    }
    const notify2 = (message) => {

        // prompt error if condition is not met
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: "toastify-color-welcome"
        });
      }

    const displayBtn = btn && (
        <Fragment>
            <div style={{display: "flex"}}>
                <div onClick={notify2("Register")}  onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
                    <Link className="btn-welcome" to="/register"> Inscription</Link>
                </div>
                <div onClick={notify2("Register")} onMouseOver={setRightImg} onMouseOut={clearImg} className="rightBox">
                    <Link className="btn-welcome" to="/login"> Connection </Link>
                </div>
            </div>
        </Fragment>
    )
    return (
        <main ref={refWolverine} className="welcomePage">
            {displayBtn}
        </main>
        )
}

export default Landing