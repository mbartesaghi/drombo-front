import styled from 'styled-components';


const Section = styled.section`
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SubTitle = styled.div`
  margin-bottom: 16px;
  font-size: 1.25rem;
  font-weight: bold;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 16px;
`;

const SuministroWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const AddButton = styled.button`
  background-color: #00796b;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: center;


  &:hover {
    background-color: #004d40;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

export { Section, SubTitle, FormWrapper, SuministroWrapper, AddButtonWrapper, AddButton };