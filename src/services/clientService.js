import { app } from './firebaseConfig';
import { getDatabase, ref, push, get, remove, update } from 'firebase/database';

class ClientService {
  constructor() {
    this.db = getDatabase(app);
    this.clientsRef = ref(this.db, 'clients');
    this.url = 'https://henning-crud-default-rtdb.firebaseio.com';
  }

  // Buscar todos os dados do nó client
  async getAll() {
    try {
      const snapshots = await get(this.clientsRef);

      if (!snapshots.exists()) {
        return [];
      }

      return snapshots.val();
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
      throw error;
    }
  }

  // Buscar apenas um dado pelo ID do nó client
  async getDataById(id) {
    try {
      const docRef = this.db.collection(`${this.url}/clients`).doc(id);
      const doc = await docRef.get();
      if (doc.exists) {
        return doc.data();
      } else {
        throw new Error('Dado não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar o dado:', error);
      throw error;
    }
  }

  // Criar um novo dado no nó client
  async createData(data) {
    try {
      const res = await push(this.clientsRef, data);
      console.log(res);
      return { name: data.name };
    } catch (error) {
      console.error('Erro ao criar o dado:', error);
      throw error;
    }
  }

  // Atualizar um dado no nó client pelo ID
  async update(id, data) {
    try {
      const dadoRef = ref(this.db, `/clients/${id}`);
      update(dadoRef, data);
    } catch (error) {
      console.error('Erro ao apagar o dado:', error);
      throw error;
    }
  }

  // Apagar um dado do nó client pelo ID
  async deleteClient(id) {
    try {
      const dadoRef = ref(this.db, `/clients/${id}`);
      remove(dadoRef);
    } catch (error) {
      console.error('Erro ao apagar o dado:', error);
      throw error;
    }
  }
}

export const clientService = new ClientService();
