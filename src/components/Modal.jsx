import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';

import { Loader } from './Loader';

import { isEmailValid } from '../utils/isEmailValid.js';

export function Modal({ visible, onClose, onSubmit, currentClient }) {
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(currentClient);

  useEffect(() => {
    async function loadStates() {
      try {
        setIsLoading(true);

        const response = await fetch(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
        );
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error('Erro ao buscar os estados:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStates();

    const [state] = states.filter(
      (state) => state.sigla === currentClient.state
    );
    const newCity = [{ id: '1', nome: currentClient.city }];

    setCities(newCity);
    setFormData({
      ...currentClient,
      state,
      city: { id: '1', nome: currentClient.city },
    });
  }, [currentClient]);


  function handleSubmit() {
    if (validateForm()) {
      const clientData = {
        ...formData,
        state: formData.state.sigla,
        city: formData.city.nome,
      };

      if (currentClient.name) {
        onSubmit({ clientId: currentClient.id, clientData });
        console.log('Dados do formulário:', clientData);
        onClose();
        return;
      }
      onSubmit(clientData);

      console.log('Dados do formulário:', clientData);
      onClose();
    }
  }

  function validateForm() {
    let isValid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = true;
      isValid = false;
    }

    if (!isEmailValid(formData.email)) {
      newErrors.email = true;
      isValid = false;
    }

    if (!formData.cpf) {
      newErrors.cpf = true;
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = true;
      isValid = false;
    }

    if (!formData.state) {
      newErrors.state = true;
      isValid = false;
    }

    if (!formData.city) {
      newErrors.city = true;
      isValid = false;
    }

    if (!formData.street) {
      newErrors.street = true;
      isValid = false;
    }

    if (!formData.houseNumber) {
      newErrors.houseNumber = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  function validateCEP(cep) {
    // Regex para validar o CEP
    const regex = /^\d{5}-\d{3}$/;
    return regex.test(cep);
  }

  async function handleCEPChange(event) {
    const cep = event.target.value;
    setFormData({ ...formData, cep });

    if (validateCEP(cep)) {
      setIsLoading(true);

      // Faz a request para a API ViaCEP para buscar os dados do endereço
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        const [state] = states.filter((estado) => estado.sigla === data.uf);
        const newCity = [{ id: data.ddd, nome: data.localidade }];

        setCities(newCity);
        setFormData({
          ...formData,
          cep,
          state,
          city: { id: data.ddd, nome: data.localidade },
          street: data.logradouro,
          complement: data.complemento,
        });
        setErrors({
          ...errors,
          state: false,
          city: false,
          street: false,
        });
      } catch (error) {
        console.error('Erro ao buscar os dados do CEP:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handleStateChange(event) {
    const estado = event.target.value;
    setFormData({ ...formData, state: estado, city: '' });

    setIsLoading(true);

    // Faz a request para a API do IBGE para buscar as cidades do estado selecionado
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.id}/municipios`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Erro ao buscar as cidades:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Dialog
        className="w-screen sm:w-5"
        header="Cadastrar Cliente"
        visible={visible}
        onHide={onClose}
        footer={
          <>
            <Button
              label="Cancelar"
              className="p-button-text"
              onClick={onClose}
              disabled={isLoading}

            />
            <Button
              label="Salvar"
              className="p-button-primary mt-3"
              onClick={handleSubmit}
              disabled={isLoading}

            />
          </>
        }
        blockScroll
      >
        <Loader isLoading={isLoading} />
        <form className="p-fluid flex flex-column gap-3">
          <div className="p-field">
            <label
              className="text-color-secondary text-base ml-2"
              htmlFor="name"
            >
              Nome
            </label>
            <InputText
              id="name"
              placeholder="Digite seu nome"
              value={formData.name}
              onChange={(e) => {
                setErrors({ ...errors, name: false });
                setFormData({ ...formData, name: e.target.value });
              }}
              className={`mt-1 ${errors.name ? 'p-invalid' : ''}`}
            />
          </div>

          <div className="p-field">
            <label
              className="text-color-secondary text-base ml-2"
              htmlFor="email"
            >
              Email
            </label>
            <InputText
              id="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={(e) => {
                setErrors({ ...errors, email: false });
                setFormData({ ...formData, email: e.target.value });
              }}
              className={`mt-1 ${errors.email ? 'p-invalid' : ''}`}
            />
          </div>

          <div className="p-field">
            <label
              className="text-color-secondary text-base ml-2"
              htmlFor="cpf"
            >
              CPF
            </label>
            <InputMask
              id="cpf"
              mask="999.999.999-99"
              value={formData.cpf}
              onChange={(e) => {
                setErrors({ ...errors, cpf: false });
                setFormData({ ...formData, cpf: e.target.value });
              }}
              className={`mt-1 ${errors.cpf ? 'p-invalid' : ''}`}
            />
          </div>

          <div className="p-field">
            <label
              className="text-color-secondary text-base ml-2"
              htmlFor="phone"
            >
              Telefone
            </label>
            <InputMask
              id="phone"
              mask="(99) 99999-9999"
              value={formData.phone}
              onChange={(e) => {
                setErrors({ ...errors, phone: false });
                setFormData({ ...formData, phone: e.target.value });
              }}
              className={`mt-1 ${errors.phone ? 'p-invalid' : ''}`}
            />
          </div>
          <div className="p-field">
            <label
              className="text-color-secondary text-base ml-2"
              htmlFor="cep"
            >
              CEP (opcional)
            </label>
            <InputMask
              id="cep"
              mask="99999-999"
              value={formData.cep}
              onChange={handleCEPChange}
            />
          </div>

          <div className="p-field">
            <label
              className="text-color-secondary text-base ml-2"
              htmlFor="state"
            >
              Estado
            </label>
            <Dropdown
              id="state"
              value={formData.state}
              options={states}
              optionLabel="nome"
              placeholder="Selecione a Cidade"
              onChange={(e) => {
                setErrors({ ...errors, state: false });
                handleStateChange(e);
              }}
              className={`mt-1 ${errors.state ? 'p-invalid' : ''}`}
            />
          </div>

          <div className="p-field">
            <label
              className="text-color-secondary text-base ml-2"
              htmlFor="city"
            >
              Cidade
            </label>
            <Dropdown
              id="city"
              value={formData.city}
              options={cities}
              optionLabel="nome"
              onChange={(e) => {
                setErrors({ ...errors, city: false });
                setFormData({ ...formData, city: e.target.value });
              }}
              placeholder="Selecione uma cidade"
              className={`mt-1 ${errors.city ? 'p-invalid' : ''}`}
              disabled={!formData.state}
            />
          </div>

          <div className="p-field">
            <label
              className="text-color-secondary text-base ml-2"
              htmlFor="street"
            >
              Rua
            </label>
            <InputText
              id="street"
              placeholder="Digite o nome da rua"
              value={formData.street}
              onChange={(e) => {
                setErrors({ ...errors, street: false });
                setFormData({ ...formData, street: e.target.value });
              }}
              className={`mt-1 ${errors.street ? 'p-invalid' : ''}`}
            />
          </div>

          <div className="p-field">
            <label
              className="text-color-secondary text-base ml-2"
              htmlFor="houseNumber"
            >
              Numero da Casa
            </label>
            <InputText
              id="houseNumber"
              placeholder="Adicione o numero da casa"
              value={formData.houseNumber}
              onChange={(e) => {
                setErrors({ ...errors, houseNumber: false });
                setFormData({ ...formData, houseNumber: e.target.value });
              }}
              className={`mt-1 ${errors.houseNumber ? 'p-invalid' : ''}`}
            />
          </div>

          <div className="p-field">
            <label
              className="text-color-secondary text-base ml-2"
              htmlFor="complement"
            >
              Complemento (opcional)
            </label>
            <InputText
              id="complement"
              placeholder="Digite um complemento"
              value={formData.complement}
              onChange={(e) =>
                setFormData({ ...formData, complement: e.target.value })
              }
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentClient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    cpf: PropTypes.string,
    phone: PropTypes.string,
    cep: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string,
    houseNumber: PropTypes.string,
    complement: PropTypes.string,
  }),
};

Modal.defaultProps = {
  visible: false,
  currentClient: {
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
  },
};
