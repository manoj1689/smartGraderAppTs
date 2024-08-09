import React from "react";
import EvaluationCard from "./EvaluationCard";
import ScreenshotPage from "./ScreenShots";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const EvaluationRecord = ( {user ,screenshotsList}) => {

  return (
    <div className="container w-full ">
        <Tabs>
    <TabList>
      <Tab>
      <span className="text-lg font-extralight ">AI Evalutaion</span>
      </Tab>
      <Tab>
      <span className="text-lg font-extralight ">Screen Records</span>
      </Tab>
    </TabList>

    <TabPanel>
    {user.map((record, index) => (
         <EvaluationCard key={index} record={record} />
      
      ))}
    </TabPanel>
    <TabPanel>
    
      <div>
        <ScreenshotPage screenshotsList={screenshotsList}/>
      </div>
    </TabPanel>
  </Tabs>
    
     
   
    </div>
  );
};

export default EvaluationRecord;
