import styled from 'styled-components'

export const Section = styled.div`
  display: flex;
  margin-bottom: 20px;
`

export const SubTitle = styled.div`
  font-size: 22px;
  width: 300px;
`

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;

  label {
    font-size: 16px;
    color: #28282B;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
`
