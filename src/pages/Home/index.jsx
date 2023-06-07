import { useEffect, useState, useRef } from 'react';

import { Modal } from '../../components/Modal';
import { Menu } from '../../components/Menu';
import { Table } from '../../components/Table';
import { Toast } from 'primereact/toast';

import { clientService } from '../../services/clientService';

import './styles.css';
import { Loader } from '../../components/Loader';


const defaultInitForm = {
  name: '',
  email: '',
  cpf: '',
  phone: '',
  cep: '',
  state: '',
  city: '',
  street: '',
  houseNumber: '',
  complement: '',
};

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentClient, setCurrentClient] = useState(defaultInitForm);
  const [clients, setClients] = useState([]);
  const toast = useRef(null);

  async function loadClients() {
    try {
      setIsLoading(true);
      const data = await clientService.getAll();

      if (data.length < 1) {
        return;
      }

      const clientsArray = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      setClients(clientsArray);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  function onOpenModal() {
    setCurrentClient(defaultInitForm);
    setIsModalVisible(true);
  }

  function onCloseModal() {
    setIsModalVisible(false);
  }

  function loadClientInForm(clientData) {
    setCurrentClient(clientData);
    setIsModalVisible(true);
  }

  async function handleCreateClient(clientData) {
    try {
      setCurrentClient(defaultInitForm);
      await clientService.createData(clientData);
      loadClients();
              toast.current.show({
          severity: 'sucess',
          summary: 'Cliente criado com sucesso',
        
        });
    } catch (error) {
      console.log('Deu erro: ', error);
    }
  }

  async function handleEditClient({ clientId, clientData }) {
    try {
      await clientService.update(clientId, clientData);
      loadClients();
      toast.current.show({
        severity: 'Sucess',
        summary: 'Informações editadas com sucesso',
      });
    } 
    catch (error) {
      console.log('Ocorreu erro: ', error);
    }
  }

  async function handleDeleteClient(clientData) {
    try {
      await clientService.deleteClient(clientData.id);
      loadClients();
      toast.current.show({
        severity: 'Sucess',
        summary: 'Cliente excluido com sucesso',
      });
    } catch (error) {
      console.log('Ocorreu um erro : ', error);
    }
  }

  return (
    <div className="w-full px-4 max-h-screen md:p-0 md:w-8">
      <Loader isLoading={isLoading} />
      <Modal
        visible={isModalVisible}
        onClose={onCloseModal}
        onSubmit={currentClient.name ? handleEditClient : handleCreateClient}
        currentClient={currentClient}
      />
      <Menu onOpenModal={onOpenModal} />
      <Table
        clients={clients}
        onEditClient={loadClientInForm}
        onDeleteClient={handleDeleteClient}
      />
      <Toast ref={toast} />
    </div>

);
}
