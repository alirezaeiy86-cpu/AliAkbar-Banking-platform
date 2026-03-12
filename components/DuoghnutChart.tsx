"use client"
import React from "react";
import {Chart as ChartJS,ArcElement,Tooltip,Legend} from "chart.js"
import {Doughnut} from "react-chartjs-2"
import { Flag } from "lucide-react";
ChartJS.register(ArcElement,Tooltip,Legend);

const DuoghnutChart=({accounts}:DoughnutChartProps)=>{
    const accountName = accounts.map((a) => a.name);
    const balances =accounts.map((a)=> a.currentBalance);
    const data={
        datasets:[
            {
                label:'Banks',
                data:balances,
                backgroundColor:['#0747b6','#2265d8','#2f91fa']
            }
        ],
        labels:accountName
    }

    return <Doughnut
    options={{
        cutout:'60%',
        plugins:{
            legend: {
                display:false
            }
        }
    }}
    data={data} />
        
}

export default DuoghnutChart