import styled from 'styled-components';

interface CardWrapperProps {
  width?: string;
}

export const CardWrapper = styled.div<CardWrapperProps>`
  width: ${props =>  props.width || '400px'};
  height: 200px;
  padding: 20px;
  margin: 20px 5px;
  background-color: white;
  display: flex;
  border: 1px solid #efefef;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex-direction: column;
  flex-wrap: wrap;
`

export const CardTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-left: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
`