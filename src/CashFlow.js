
import { useEffect, useState } from "react";
import data from './db.json'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import {Line} from 'react-chartjs-2';



ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

const arr=[],arr2=[],arr3=[];
const ans2=data.map((i)=>{
    var st=i.asOfDate;
   
    var balance=i.openingBalance;
    var date=new Date("2023-07-27")
   
i.cashFlows.map((a)=>{
   var diff=0;
   var j=0;
    while(balance>=0){
        
        const dateCopy = new Date(date);
        dateCopy.setDate(date.getDate()+j)
        arr2.push(dateCopy);
        
        let now=dateCopy.toString().slice(4,10)
        arr3.push(parseInt(now.slice(4,6)))
    
        
            diff=balance-a.amount; 
                  balance=diff;
          if(now==="Aug 01"){
            diff=balance+a.amount;
           }
           console.log(diff,now)  
           balance=diff;
         arr.push(balance)
         j++;
         
    }

})
})





function CashFlow(){

    
  const [chartData, setChartData] = useState({})



  useEffect(() => {

    setTimeout(() => {
      setChartData({
        labels:arr2,
        datasets: [
          {
            label: 'Cashflow Projection',
            data: arr,
            fill: true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      })
    }, 1000)

  }, [])
  
  return (
    <div className="App">
      <div className='chart'>
        {
          chartData && chartData?.datasets && (
            <Line 
              options={ {
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'ABC Company',
                    },
                  },
                }} 
              data={chartData} 
            />
          )
        }
      </div>
    </div>
  );



}

export default CashFlow;