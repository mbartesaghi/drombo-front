import { CardWrapper, CardTitle, ContentWrapper } from './styles';
import CardProps from './card.types';

const Card = ({title, icon, width, children}:CardProps) => {
  return (
    <CardWrapper width={width}>
      <CardTitle>
        {title} 
        <img src={icon} width={'42px'} />
      </CardTitle>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </CardWrapper>
  );
}

export default Card;


