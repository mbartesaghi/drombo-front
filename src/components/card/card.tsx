import { CardWrapper, CardTitle, ContentWrapper } from './styles';
import CardProps from './card.types';

const Card = ({ title, icon, children }: CardProps) => {
  return (
    <CardWrapper >
      <CardTitle>
        <p>{title}</p>
        <img src={icon} width={'42px'} />
      </CardTitle>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </CardWrapper>
  );
}

export default Card;


