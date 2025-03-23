import { v4 as uuidv4 } from 'uuid';

export interface Contract {
  id: string;
  contractCode: string;
  clientName: string;
  sessionDate: string;
  contractedPhotos: number;
  additionalPhotos: number;
  status: string;
  location: string;
  hasAlbum: boolean;
  hasSignatureBook: boolean;
  hasRetrospective: boolean;
  contractValue: number;
  paymentStatus: string;
  finishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

class ContractService {
  private contracts: Contract[] = [];

  getAllContracts(): Contract[] {
    return this.contracts;
  }

  getContractById(id: string): Contract | undefined {
    return this.contracts.find(contract => contract.id === id);
  }

  createContract(contractData: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>): Contract {
    const now = new Date().toISOString();
    const newContract: Contract = {
      id: uuidv4(),
      ...contractData,
      createdAt: now,
      updatedAt: now
    };

    this.contracts.push(newContract);
    return newContract;
  }

  updateContract(id: string, contractData: Partial<Contract>): Contract | undefined {
    const contractIndex = this.contracts.findIndex(contract => contract.id === id);
    if (contractIndex === -1) return undefined;

    const updatedContract = {
      ...this.contracts[contractIndex],
      ...contractData,
      updatedAt: new Date().toISOString()
    };

    this.contracts[contractIndex] = updatedContract;
    return updatedContract;
  }

  deleteContract(id: string): boolean {
    const initialLength = this.contracts.length;
    this.contracts = this.contracts.filter(contract => contract.id !== id);
    return this.contracts.length !== initialLength;
  }

  searchContracts(query: string): Contract[] {
    const lowercaseQuery = query.toLowerCase();
    return this.contracts.filter(contract =>
      contract.contractCode.toLowerCase().includes(lowercaseQuery) ||
      contract.clientName.toLowerCase().includes(lowercaseQuery)
    );
  }

  filterContractsByStatus(status: string): Contract[] {
    return this.contracts.filter(contract => contract.status === status);
  }

  filterContractsByPaymentStatus(paymentStatus: string): Contract[] {
    return this.contracts.filter(contract => contract.paymentStatus === paymentStatus);
  }
}

export const contractService = new ContractService();