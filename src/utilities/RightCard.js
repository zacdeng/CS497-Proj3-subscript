import React from "react";
import { useUserState } from "./firebase";
import "./css/RightCard.css"
import { PieChart } from 'react-minimal-pie-chart';
import {useData} from "./firebase";
import {ListItem, ListItemText} from "@mui/material";

const dataMock = [
    { title: 'Netfix', value: 17.99, color: 'rgba(252, 108, 70, 0.9)' },
    { title: 'Adobe', value: 19.99, color: 'rgba(28, 133, 255, 0.9)' },
    { title: 'Spotify', value: 4.99, color: 'rgba(255, 194, 59, 0.9)' },
    { title: 'Paste', value: 14.99, color: 'rgba(233, 166, 153, 0.9)'},
    { title: 'Prime', value: 12.99, color: 'rgba(72, 114, 171, 0.9)'}
];

const DetailsBar = ({detailsTitle, detailsItem}) => {
    const style = {
        borderRadius: 2,
        bgcolor: "rgba(255, 255, 255, 0.9)",
        boxShadow: 2,
        marginBottom: 2,
        marginLeft: 10,
        width: "60%",
    }

    return (
        <ListItem disablePadding sx={style}>
            <ListItemText primary={detailsTitle} style={{textAlign:"center"}} />
            <ListItemText primary={detailsItem} style={{textAlign:"center"}} />
        </ListItem>
    )
}

const RightCardStatic = () => {
    const totalSpendingMonthly = () => {
        return 17.99 + 19.99 + 4.99 + 14.99/12 + 12.99
    }
    const totalSpendingAnnually = () => {
        return Math.round(100*((17.99 + 19.99 + 4.99 + 12.99)*12 + 14.99))/100
    }

    return (
        <div>
            <PieChart data={dataMock}
                      radius={30}
                      segmentsShift={(index) => (index === 0 ? 3 : 0.7)}
                      label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
                      labelStyle={(index) => ({
                          fill: "white",
                          fontSize: '5px',
                          fontFamily: 'sans-serif',
                      })}
                      onMouseOver={(e, segmentIndex) => {

                      }}
                      onMouseOut={(e, segmentIndex) => {

                      }}
                      onClick={(e, segmentIndex) => {

                      }}
                      animate
                      animationDuration={1000}
            />
            <div className="Details">
                <DetailsBar detailsTitle={"Items:" } detailsItem={5} />
                <DetailsBar detailsTitle={"Total per month:"} detailsItem={"$ " + totalSpendingMonthly().toFixed(2)} />
                <DetailsBar detailsTitle={"Total per year:"} detailsItem={"$ " + totalSpendingAnnually().toFixed(2)} />
            </div>
        </div>
    )
}

const RightCardLogin = ({user}) => {
    const reformatPath = (path) => path.replace(/[^A-Z0-9]+/ig, "_");
    const generateColorNum = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const generateColor = () => {
        return 'rgba(' + generateColorNum(0, 255) + ', ' + generateColorNum(0, 255) + ', ' + generateColorNum(0, 255) + ', ' + 0.9 + ')';
    }

    const [subscriptionsData, loading, error] = useData("/" + reformatPath(user.email) + "/subscriptions");
    if (error) return <h2>{error}</h2>;
    if (loading) return <h2>Loading the pie-chart...</h2>;

    let loginDataMockCopy = [];
    subscriptionsData != null ? subscriptionsData.map((e) => {
        loginDataMockCopy.push({ title: e.name,
                                 value: e.type === 1 ? parseFloat(e.price): 12 * parseFloat(e.price),
                                 color: generateColor()
                               });
    }) : loginDataMockCopy = [];

    const totalSpending = () => {
        let annualSum = 0;
        loginDataMockCopy.forEach((value) => {
            annualSum += value.value;
        })
        return annualSum;
    }

    return (
        <div>
            <PieChart data={loginDataMockCopy}
                      radius={30}
                      segmentsShift={(index) => (index === 0 ? 3 : 0.7)}
                      label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
                      labelStyle={(index) => ({
                          fill: "white",
                          fontSize: '5px',
                          fontFamily: 'sans-serif',
                      })}
                      onMouseOver={(e, segmentIndex) => {

                      }}
                      onMouseOut={(e, segmentIndex) => {

                      }}
                      onClick={(e, segmentIndex) => {

                      }}
                      animate
                      animationDuration={1000}
            />
            <div className="Details">
                <DetailsBar detailsTitle={"Items:" } detailsItem={loginDataMockCopy.length} />
                <DetailsBar detailsTitle={"Total per month:"} detailsItem={"$ " + (totalSpending()/12).toFixed(2)} />
                <DetailsBar detailsTitle={"Total per year:"} detailsItem={"$ " + totalSpending().toFixed(2)} />
            </div>
        </div>
    )
}

export const RightCard = () => {
    const [user] = useUserState();

    return (
        <div className="rightcard">
            <div>
                { user ?  <RightCardLogin user={user}/> : <RightCardStatic /> }
            </div>
        </div>
    )
}
