
import Card from '../../components/card/card';
import Dron from '../../assets/dron-de-camara.png';
import CustomTable from '../../components/table/table';
import { CardWrapper, Text } from './styles';

const Dashboard = () => {
  return (
    <div>
      <CardWrapper>
        <Card title="Estado del drón" icon={Dron}>
          <Text>En vuelo</Text>
        </Card>
        <Card title="Traslados pendientes" >
          <Text>3</Text>
        </Card>
        <Card title="" />
      </CardWrapper>
      <CustomTable />
    </div>
  );
}

export default Dashboard;
