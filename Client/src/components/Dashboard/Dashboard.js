// static 5 year rainfall ka data
// Show static insurance and Mutual fund(Canara bank has khudka) products images

import React, { useContext, useEffect, useState } from 'react'
import last5YearRainfall from '../../assets/5yearrainfall.png'
import forecast from '../../assets/forecast.jpeg'
import policy1 from '../../assets/policy1.jpeg'
import policy2 from '../../assets/policy2.jpeg'
import policy3 from '../../assets/policy3.jpeg'
import mutual from '../../assets/mutual.jpeg'
import { ButtonContainer2, DashboardContainer, ErrorText, ImageContainer, MFContainer, PolicyContainer, PolicyMFContainer, PolicyMFText, PredictionText, SuggestionBox, SuggestionContainer, SuggestionHeading, SuggestionText } from './Style'
import { Button } from '../Shared/styles'
import { RegistrationContext } from '../Registration/RegistrationContext'
import axios from 'axios'

const Dashboard = () => {
    const { inputData } = useContext(RegistrationContext);
    const [predict, setPredict] = useState(0);
    const [error,setError] = useState(false);

    useEffect(()=>{
        const data = {
            Branch_Code: {value: inputData.Branch_Code.value},
            CoAp_Income: {value: inputData.CoAp_Income.value},
            Customer_No: {value: inputData.Customer_No.value},
            Ever_Default_L12M: {value: inputData.Ever_Default_L12M.value},
            Max_DPD_L3m: {value: inputData.Max_DPD_L3m.value},
            Max_Loan_Balance_Others: {value: inputData.Max_Loan_Balance_Others.value},
            Max_Perc_Def_Chg_Pending: {value: inputData.Max_Perc_Def_Chg_Pending.value},
            Max_Ratio_OC_Pending_POS: {value: inputData.Max_Ratio_OC_Pending_POS.value},
            Max_Utilization: {value: inputData.Max_Utilization.value},
            N_Default_L3m: {value: inputData.N_Default_L3m.value},
            N_Enq_L9m: {value: inputData.N_Enq_L9m.value},
            N_Family_Member:{value: inputData.N_Family_Member.value},
            Age: {value: inputData.Age.value},
            N_PosBkt_L3m: {value: inputData.N_PosBkt_L3m.value},
            N_WorkEx_Yr: {value: inputData.N_WorkEx_Yr.value},
            Perc_Paymode_Cheq_Fail: {value: inputData.Perc_Paymode_Cheq_Fail.value},
            Perc_Paymode_Online: {value: inputData.Perc_Paymode_Online.value},
            Perc_Repay_Fail: {value: inputData.Perc_Repay_Fail.value},
            Total_Field_Trails: {value: inputData.Total_Field_Trails.value},
            Total_Resolved: {value: inputData.Total_Resolved.value},
            }
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
        axios.post('https://canara.onrender.com/re', data, config )
        .then(response => {
            setPredict(Number((response.data.result[0] * 100).toFixed(2)))
            setError(false);
        })
        .catch(error => {
          console.error('Error:', error.message); 
          console.error('Error Details:', error.response.data); 
          setError(true);
          setPredict(0);
        });
    },[inputData])
    
  return (
    !error ? 
        <DashboardContainer>
            <PredictionText>Prediction: {predict}%</PredictionText>
            <ImageContainer>
                <img height={200} width={300} src={last5YearRainfall} alt="Text" />
                <img height={200} width={300} src={forecast} alt="Text" />
            </ImageContainer>
            <PolicyMFContainer>
                <div>
                    <PolicyMFText>Policies</PolicyMFText>
                    <MFContainer>
                        <img height={100} width={200} src={policy1} alt="Text" />
                        <img height={100} width={200} src={policy2} alt="Text" />
                        <img height={100} width={200} src={policy3} alt="Text" />
                    </MFContainer>
                </div>
                <div>
                    <PolicyMFText>Mutual Fund Container</PolicyMFText>
                    <PolicyContainer>
                        <img height={200} width={300} src={mutual} alt="Text" />
                    </PolicyContainer>
                </div>
            </PolicyMFContainer>
            <div>
                <SuggestionHeading>Suggestions</SuggestionHeading>
                    <SuggestionContainer>
                        <SuggestionBox>
                            <SuggestionBox>Low:</SuggestionBox>
                            <SuggestionText>Discounts on adding guarantors</SuggestionText>
                            <SuggestionText>Increase phone based communication  </SuggestionText>
                            <SuggestionText>and decrease field trails for operational efficiency </SuggestionText>
                        </SuggestionBox>
                        <SuggestionBox>
                            <SuggestionText>Medium: </SuggestionText>
                            <SuggestionText>Discounts on adding guarantors </SuggestionText>
                            <SuggestionText>mandatory collaterals and insurance</SuggestionText>
                        </SuggestionBox>
                        <SuggestionBox>
                            <SuggestionText>High: </SuggestionText>
                            <SuggestionText>Mandatory guarantors and insurance(if not collaterals)</SuggestionText>
                            <SuggestionText>Field Trails and taking customer feedback is necessary</SuggestionText>
                        </SuggestionBox>
                </SuggestionContainer>
            </div>
            <ButtonContainer2>
                <Button><a href='mailto:Chandrachudpati@gmail.com'>Send mail to Branch Manager</a></Button>
            </ButtonContainer2>  
        </DashboardContainer>
        :
        <ErrorText>Kindly Submit the form again</ErrorText>
  )
}

export default Dashboard