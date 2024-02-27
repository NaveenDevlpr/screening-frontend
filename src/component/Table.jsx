import React, { useEffect, useState } from 'react'
import Patient from './ui/Patient';
import Dates from './ui/Date';
import Time from './ui/Time';
import Doctor from './ui/Doctor';
import Injury from './ui/Injury';
import { SlOptionsVertical } from "react-icons/sl";

const Table = () => {
    const headers=[
        'Patients',
        'Date',
        'Time',
        'Doctor',
        'Injury',
        'Action'
    ];

    const colors=['#222222','#222222','#222222','#222222','#222222']

    const [data,setData]=useState([])



    const getData=async()=>{
        const data=await fetch('https://gist.githubusercontent.com/telematum/7751eec667033ac8acd244542e464e18/raw/d4710c6fb54224a0bd316ecdc5246633aceefce5/todays.json')
        const res=await data.json();
        setData(res.appointments)
    }

    
    useEffect(()=>{
        getData()
    },[])
  return (
    <div className='w-full ring-1 ring-gray-200/80 rounded-3xl p-8 flex-col flex space-y-5'>
        <div>
            <h2 className='text-xl text-gray-500/75 font-semibold tracking-wide'>
                Today's Appointment List
            </h2>
        </div>
        <div className=''>
            <table className='w-full text-left'>
                <thead className='text-sm text-gray-400/80 uppercase tracking-widest'>
                    <tr>
                    {
                        headers.map((e,i)=>{
                            return(
                                <th key={i} className='px-5 py-6'>{e}</th>
                            )
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    
                      {  data.map((e,i)=>{
                            return(
                                <tr key={i} className='border-t border-gray-200/80'>
                                    <td className='py-3 px-4'>
                                        <Patient color={colors[i]} name={e.patient_name} number={e.mobile_number}/>
                                    </td>
                                    <td className='py-3 px-4'>
                                        <Dates date={e.appointment_date}/>
                                    </td>
                                    <td className='py-3 px-4'>
                                        <Time normalTime={e.appointment_time}/>
                                    </td>
                                    <td className='py-3 px-4'>
                                        <Doctor name={e.doctor} index={i}/>
                                    </td>
                                    <td className='py-3 px-4'>
                                        <Injury injury={e.injury}/>
                                    </td>
                                    <td >
                                        <div className='flex items-center justify-center py-3 pr-6'>
                                            <SlOptionsVertical className='text-gray-300/60 w-6 h-6'/>
                                        </div>
                                        
                                    </td>
                                </tr>
                            )
                        })}
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Table