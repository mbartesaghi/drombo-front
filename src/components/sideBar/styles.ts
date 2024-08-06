import styled from 'styled-components';
import {NavLink} from "react-router-dom";
import * as colors from '../../utils/colors';

export const SideBarWrapper = styled.div`
  width: 250px;
  height: 100vh;
  padding: 20px;
  gap: 10px;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${colors.lightGray};
`

export const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: ${colors.gray};
  font-weight: 600;
  padding: 10px;
  height: 25px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: ${colors.blue};
    color: ${colors.white};
  }

  &.active {
    background-color: ${colors.blue};
    color: ${colors.white};
  }

`
