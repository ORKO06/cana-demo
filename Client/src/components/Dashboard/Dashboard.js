// static 5 year rainfall ka data
// Show static insurance and Mutual fund(Canara bank has khudka) products images

import React, { useContext } from 'react'
import img1 from '../../assets/logo192.png'
import last5YearRainfall from '../../assets/5yearrainfall.png'
import forecast from '../../assets/forecast.jpeg'
import policy1 from '../../assets/policy1.jpeg'
import policy2 from '../../assets/policy2.jpeg'
import policy3 from '../../assets/policy3.jpeg'
import mutual from '../../assets/mutual.jpeg'
import { ButtonContainer2, DashboardContainer, ImageContainer, MFContainer, PolicyContainer, PolicyMFContainer, PolicyMFText, PredictionText, SuggestionBox, SuggestionContainer, SuggestionHeading, SuggestionText } from './Style'
import { Button } from '../Shared/styles'
import { RegistrationContext } from '../Registration/RegistrationContext'

const Dashboard = () => {
    const { inputData } = useContext(RegistrationContext);

  console.log(inputData);
  return (
    <DashboardContainer>
        <PredictionText>Prediction: 70%</PredictionText>
        <ImageContainer>
            <img height={200} width={400} src={last5YearRainfall} alt="Text" />
            <img height={200} width={400} src={forecast} alt="Text" />
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
                    <img height={200} width={400} src={mutual} alt="Text" />
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
            <Button>Send mail to Branch Manager</Button>
        </ButtonContainer2>
            
    </DashboardContainer>
  )
}

export default Dashboard