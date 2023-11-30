import { styled } from "styled-components";
import tw from "twin.macro";

export const DashboardContainer = styled.div`
  ${tw`
   p-10
   md:p-2
  `}
`;

export const PredictionText = styled.h1`
  ${tw`
   text-center
  `}
`;

export const ImageContainer = styled.div`
  ${tw`
   flex
   justify-around
   flex-row
   md:flex-col
   md:gap-4 
  `}
`;

export const PolicyMFContainer = styled.div`
  ${tw`
  grid 
  grid-cols-2
  lg:grid-cols-1
 `}
`;

export const PolicyMFText = styled.h3`
    ${tw`
    text-center
    `}
`

export const MFContainer = styled.div`
  ${tw`
  flex
  justify-around
  gap-10
  md:flex-col
  md:gap-4 
  md:items-center
  `}
`;

export const PolicyContainer = styled.div`
  ${tw`
  flex
  justify-around
  gap-10
  `}
`;


export const SuggestionContainer = styled.div`
  ${tw`
   grid
   grid-cols-3
   md:grid-cols-1 
  `}
`;
export const SuggestionBox = styled.div`
  ${tw`
   
  `}
`;

export const SuggestionHeading = styled.h3`${tw``}`
export const SuggestionText = styled.p`${tw``}`

export const ButtonContainer2 = styled.div`${tw`
    text-center
`}`

export const ErrorText = styled.div`
  width: 100vw;
  height: 100vh;
${tw`

`}`