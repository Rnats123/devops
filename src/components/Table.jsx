import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export function Table({ clientes }) {
  const [globalFilter, setGlobalFilter] = useState(null);

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  const handleEdit = (rowData) => {
    // Lógica para a edição do cliente
    console.log('Editar cliente:', rowData);
  };

  const handleDelete = (rowData) => {
    // Lógica para a exclusão do cliente
    console.log('Excluir cliente:', rowData);
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
      scrollable
      scrollHeight="600px"
      value={clientes}
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
      <Column field="birthday" header="Data de Nascimento" sortable />
      <Column
        field="address"
        header="Endereço"
        body={(rowData) => (
          <div>
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
