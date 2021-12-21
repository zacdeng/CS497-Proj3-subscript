import React from "react";
import Box from '@mui/material/Box';
import './css/Contributors.css'

export const Contributors = () => {
    const style = {
        borderRadius:"50%",
        width:"5%",
        margin: '0 1%',
    }

    return(
        <div className="body-container">
            <div className="LeftCard">
                <img src="https://i.loli.net/2021/11/25/GE2aSnTzwtvoijY.png"
                     alt="TeamNavy"
                     className="TeamNavyImg"/>
            </div>
            <div className="RightCard">
                <p className="title"> Hi! We are <span style={{color:"dodgerblue", fontWeight:"bold"}}> Team Navy </span> !</p>
                <p style={{color:"grey", fontSize:"16px"}}> Northwestern University - CS497 final project</p>
                <p style={{color:"grey", fontSize:"16px"}}><em>contributors:</em></p>
                <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                }}>
                    <img src="https://i.loli.net/2021/11/25/mbcJ3Vd1PGq9SAy.jpg"
                         alt="zachary"
                         onClick={() => {window.open('https://github.com/zacdeng', '_blank')}}
                         style={style}/>
                    <img src="https://i.loli.net/2021/11/25/e5xnwHz2UIfKbOv.jpg"
                         alt="liqian"
                         onClick={() => {window.open('https://github.com/Maliqian0307', '_blank')}}
                         style={style}/>
                    <img src="https://i.loli.net/2021/11/25/9vnFW8o3dAXxiaE.png"
                         alt="sydney"
                         onClick={() => {window.open('https://github.com/sydneygil', '_blank')}}
                         style={style}/>
                    <img src="https://i.loli.net/2021/11/25/37e5FGIHRVkbfL8.png"
                         alt="adnan"
                         onClick={() => {window.open('https://github.com/canturkay', '_blank')}}
                         style={style}/>
                    <img src="https://i.loli.net/2021/11/25/3lIPfUp7Ft1qOi6.png"
                         alt="jeff"
                         onClick={() => {window.open('https://github.com/jeffjwl', '_blank')}}
                         style={style}/>
                    <img src="https://i.loli.net/2021/11/25/BRayAF6j8XsQ1P5.png"
                         alt="kathryne"
                         onClick={() => {window.open('https://github.com/kathrynetao', '_blank')}}
                         style={style}/>
                </Box>
            </div>
        </div>
    )
}