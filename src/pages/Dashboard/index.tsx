import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Contract, contractService } from '../../services/contracts'

const columns: GridColDef[] = [
  { field: 'contractCode', headerName: 'Código', width: 130 },
  { field: 'clientName', headerName: 'Cliente', width: 200 },
  { field: 'sessionDate', headerName: 'Data do Ensaio', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'location', headerName: 'Local', width: 130 },
  { field: 'totalPhotos', headerName: 'Total de Fotos', width: 130 },
  { field: 'contractValue', headerName: 'Valor', width: 130 },
  { field: 'paymentStatus', headerName: 'Pagamento', width: 130 },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const Dashboard = () => {
  const [contracts, setContracts] = useState<Contract[]>([])

  useEffect(() => {
    const loadContracts = () => {
      const allContracts = contractService.getAllContracts()
      setContracts(allContracts)
    }

    loadContracts()
  }, [])

  const rows = contracts.map(contract => ({
    ...contract,
    totalPhotos: contract.contractedPhotos + contract.additionalPhotos,
    contractValue: formatCurrency(contract.contractValue),
    location: contract.location === 'estudio' ? 'Estúdio' : 'Externo',
    status: {
      'agendado': 'Agendado',
      'realizado': 'Ensaio Realizado',
      'tratamento': 'Em Tratamento',
      'aprovacao': 'Em Aprovação',
      'aprovado': 'Aprovado',
      'finalizado': 'Finalizado'
    }[contract.status] || contract.status
  }))

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Contratos
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}

export default Dashboard