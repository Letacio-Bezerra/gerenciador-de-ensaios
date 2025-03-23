import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Button } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { contractService } from '../../services/contracts'

interface ContractFormData {
  contractCode: string
  clientName: string
  sessionDate: string
  contractedPhotos: number
  additionalPhotos: number
  status: string
  location: string
  hasAlbum: boolean
  hasSignatureBook: boolean
  hasRetrospective: boolean
  contractValue: number
  paymentStatus: string
}

const schema = yup.object().shape({
  contractCode: yup.string().required('Código do contrato é obrigatório'),
  clientName: yup.string().required('Nome do cliente é obrigatório'),
  sessionDate: yup.string().required('Data do ensaio é obrigatória'),
  contractedPhotos: yup.number().min(1, 'Mínimo de 1 foto').required('Quantidade de fotos é obrigatória'),
  additionalPhotos: yup.number().min(0, 'Não pode ser negativo'),
  status: yup.string().required('Status é obrigatório'),
  location: yup.string().required('Local é obrigatório'),
  contractValue: yup.number().min(0, 'Valor não pode ser negativo').required('Valor é obrigatório'),
  paymentStatus: yup.string().required('Status do pagamento é obrigatório'),
})

const NewContract = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<ContractFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      additionalPhotos: 0,
      hasAlbum: false,
      hasSignatureBook: false,
      hasRetrospective: false,
    }
  })

  const onSubmit = (data: ContractFormData) => {
    const newContract = contractService.createContract({
      ...data,
      finishedAt: undefined
    })
    console.log('Contrato criado:', newContract)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Novo Contrato
      </Typography>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
        <Controller
          name="contractCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Código do Contrato"
              error={!!errors.contractCode}
              helperText={errors.contractCode?.message}
            />
          )}
        />

        <Controller
          name="clientName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome do Cliente"
              error={!!errors.clientName}
              helperText={errors.clientName?.message}
            />
          )}
        />

        <Controller
          name="sessionDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              label="Data do Ensaio"
              InputLabelProps={{ shrink: true }}
              error={!!errors.sessionDate}
              helperText={errors.sessionDate?.message}
            />
          )}
        />

        <Controller
          name="contractedPhotos"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Fotos Contratadas"
              error={!!errors.contractedPhotos}
              helperText={errors.contractedPhotos?.message}
            />
          )}
        />

        <Controller
          name="additionalPhotos"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Fotos Adicionais"
              error={!!errors.additionalPhotos}
              helperText={errors.additionalPhotos?.message}
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.status}>
              <InputLabel>Status do Pedido</InputLabel>
              <Select {...field} label="Status do Pedido">
                <MenuItem value="agendado">Agendado</MenuItem>
                <MenuItem value="realizado">Ensaio Realizado</MenuItem>
                <MenuItem value="tratamento">Em Tratamento</MenuItem>
                <MenuItem value="aprovacao">Em Aprovação</MenuItem>
                <MenuItem value="aprovado">Aprovado</MenuItem>
                <MenuItem value="finalizado">Finalizado</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.location}>
              <InputLabel>Local do Ensaio</InputLabel>
              <Select {...field} label="Local do Ensaio">
                <MenuItem value="estudio">Estúdio</MenuItem>
                <MenuItem value="externo">Externo</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Box sx={{ gridColumn: '1 / -1' }}>
          <Typography variant="subtitle1" gutterBottom>
            Produtos Extras
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Controller
              name="hasAlbum"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Álbum"
                />
              )}
            />

            <Controller
              name="hasSignatureBook"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Livro de Assinatura"
                />
              )}
            />

            <Controller
              name="hasRetrospective"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Retrospectiva"
                />
              )}
            />
          </Box>
        </Box>

        <Controller
          name="contractValue"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Valor do Contrato"
              error={!!errors.contractValue}
              helperText={errors.contractValue?.message}
            />
          )}
        />

        <Controller
          name="paymentStatus"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.paymentStatus}>
              <InputLabel>Status do Pagamento</InputLabel>
              <Select {...field} label="Status do Pagamento">
                <MenuItem value="pendente">Pendente</MenuItem>
                <MenuItem value="parcial">Parcialmente Pago</MenuItem>
                <MenuItem value="pago">Pago</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" size="large">
          Cadastrar Contrato
        </Button>
      </Box>
    </Box>
  )
}

export default NewContract