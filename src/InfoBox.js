import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import "./InfoBox.css";

const InfoBox = ({ title, cases, total, active, isRed, type, ...props }) => {
    return (
        <Card onClick={props.onClick}
            className={
                `infoBox ${active && "infoBox--selected"} 
                ${type==="cases" && "infoBox--red"}
                ${type==="deaths" && "infoBox--black"}`
            }
        >
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className={`infoBox__cases ${type}`}>{cases}</h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
