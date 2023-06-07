import { PropTypes } from 'prop-types';
import { useContext } from 'react';

import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

import { AuthContext } from '../contexts/authProvider';

export function Menu({ onOpenModal }) {
  const { signOut } = useContext(AuthContext);

  return (
    <Toolbar
      left={
        <>
          <Button
            label="Cadastrar Cliente"
            icon="pi pi-plus"
            className="mr-2"
            onClick={onOpenModal}
          />
        </>
      }
      right={
        <>
          <Button
            label="Sair"
            icon="pi pi-sign-out"
            className="p-button-danger"
            onClick={signOut}
          />
        </>
      }
    />
  );
}

Menu.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};
