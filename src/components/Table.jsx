import PropTypes from 'prop-types';
import { useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export function Table({ clients, onDeleteClient, onEditClient }) {
  const [globalFilter, setGlobalFilter] = useState(null);

  const actionTemplate = (rowData) => {
    return (
      <div className="w-7rem flex justify-content-between">
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => onEditClient(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          className="p-button-rounded p-button-danger"
          onClick={() => onDeleteClient(rowData)}
        />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-row w-full align-items-center justify-content-between">
        <h3 className="p-mr-2 w-min">Clientes</h3>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Pesquisar CPF"
          />
        </span>
      </div>
    );
  };

  return (
    <DataTable
      className="mt-2 max-h-full"
      responsiveLayout="stack"
      breakpoint="575px"
      value={clients}
      paginator
      rows={15}
      rowsPerPageOptions={[10, 15, 30]}
      globalFilter={globalFilter}
      header={renderHeader()}
      emptyMessage="Nenhum cliente encontrado."
    >
      <Column
        field="name"
        header="Nome"
        sortable
        filter
        filterPlaceholder="Filtrar por nome"
      />
      <Column
        field="email"
        header="Email"
        sortable
        filter
        filterPlaceholder="Filtrar por email"
      />
      <Column
        field="cpf"
        header="CPF"
        sortable
        filter
        filterPlaceholder="Filtrar por CPF"
      />
      <Column
        field="phone"
        header="Telefone"
        sortable
        filter
        filterPlaceholder="Filtrar por telefone"
      />
      <Column
        field="address"
        header="Endereço"
        body={(rowData) => (
          <div className="w-11rem flex flex-column align-items-end sm:align-items-start">
            <p>{rowData.cep}</p>
            <p>{`${rowData.city} - ${rowData.state}`}</p>
            <p>{`${rowData.street}, ${rowData.houseNumber}`}</p>
            <p>{rowData.complement}</p>
          </div>
        )}
      />
      <Column
        field=""
        header="Ações"
        body={actionTemplate}
        style={{ width: '8rem', textAlign: 'center' }}
      />
    </DataTable>
  );
}

Table.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      cpf: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      cep: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      houseNumber: PropTypes.string.isRequired,
      complement: PropTypes.string.isRequired,
    })
  ).isRequired,
};
