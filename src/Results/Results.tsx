import {useQuery} from 'react-query';
import Item from '../Item/Item';
import { LinearProgress ,Button, Grid } from '@mui/material';
import React, {useState, useEffect} from "react";
import { Wrapper } from "./Results.styles";

interface ResultProps {
    term: string;
}

export type CourseItemType = {
    id: number;

    title: string;
    text: string;
}

export type courseInformation = {
    info: {
        outlinePath: string
        name: string
    }
    instructor: [{ 
        lastName: string,
        commonName: string,
        name: string,
        firstName: string
    }]
    courseSchedule: [{
        startTime: string,
        startDate: string,
        roomNumber: string,
        days: string,
        endDate: string,
        endTime: string,
        isExam: boolean,
        campus: string
    }]

}

// return type: array of 'CourseItemType' from Promise
const getCourses = async(url:string): Promise<courseInformation> => {
    try {
        const response = await fetch(url);
    
        if (!response.ok) {
          throw new Error(response.statusText);
        }
    
        return response.json();
      } catch (error) {
        if (error instanceof TypeError) {
          throw { name: 'InvalidUrlError', message: 'Invalid URL' };
        } else {
          throw error;
        }
      }
}
    
const parse = (term: string) => {
    let courseCode;
    let courseNumber;
    let courseSection;
    const match = term.trim().match(/^([a-zA-Z]+)(\s*)(\d+)?(\s*)([dD]?)(\d+)?$/);

    if (match) {
    courseCode = match[1];
    courseNumber = match[3] || ""; // Use empty string if course number is not present
    courseSection = match[5].toLowerCase() + (match[6] || "");
}
    if(courseCode == undefined) {
        return "";
    }

    if(courseNumber == undefined){
        return `/${courseCode}`;
    }

    if(courseSection == undefined){
        return `/${courseCode}/${courseNumber}`;
    }

    return `/${courseCode}/${courseNumber}/${courseSection}`;
  
    
}

export const Results: React.FC<ResultProps> = ({term}) => {

    const searchTerm = parse(term);

    const baseUrl = `http://www.sfu.ca/bin/wcm/course-outlines?2023/Summer${searchTerm}`;
    
    
    const { data, isLoading, error, refetch} = useQuery<courseInformation>(
        'courses', //key
        () => getCourses(baseUrl),
        
    );
    
    useEffect(() => {
       refetch();
    },[term]);



    if(isLoading) {
        return (<div><LinearProgress/></div>);
    }
    if(error) {
        return <div>Somthing went wrong</div>
    }

    
        
    
    if(Array.isArray(data)){

        return(
            <div>
                <Wrapper>
                    <Grid container spacing={3}>
                        {data?.map(item => (
                        <Grid item key={item.id} xs={12}sm={4}>
                            <Item item={item}></Item>
                        </Grid>
                        ))}
                    
                    </Grid>
                </Wrapper>
            </div>
        )
    
    }else{
        
        console.log(data?.info);
        // const {info, instructor, courseSchedule} = data;
        return(
            <Wrapper>
                <div>
                    <h3>{data?.info.name}</h3>
                    <div>
                        {data?.instructor[0].name}
                    </div>
                    <div>
                        {data?.courseSchedule[0].campus}
                    </div>
                </div>
            </Wrapper>
           
            
        )
    }
    
}

export default Results;