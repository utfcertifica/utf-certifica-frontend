import { PageHeader } from "@components/page-header";
import PageWrapper from "@components/page-wrapper";
import { Avatar, Box, FormControl, FormLabel, Grid, Input } from '@mui/joy';
import { ChangeEvent, FormEvent, useState } from 'react';

const MinhaContaPage = () => {
  const [formData, setFormData] = useState({
    ra: '1234567',
    lattes: 'http://lattes.cnpq.br/1234567',
    nomeCompleto: 'Enter your full name',
    email: 'Enter your best e-mail',
    telefone: 'Enter your phone',
  });

  const [foto, setFoto] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFoto(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    console.log('Foto:', foto);
  };

  return (
    <PageWrapper breadcrumbLabel="Minha Conta">
      <PageHeader title="Minha conta" subtitle="29 de março de 2024" />
      <Box sx={{ maxWidth: '100%', position: 'relative' }}>
        <FormControl>
          <Grid container spacing={4}>
            <Grid xs={12} marginTop="20px">
              <Grid container spacing={2} alignItems="center">
                <Grid>
                  <FormLabel sx={{ fontWeight: 'bold' }}>RA: {formData.ra}</FormLabel>
                  <FormLabel sx={{ fontWeight: 'bold' }}>Lattes: {formData.lattes}</FormLabel>
                </Grid>
                <Grid>
                  <Avatar
                    variant="outlined"
                    src="https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2014/11/formacao_1600x1200-uma-mulher-virtuosa-e-feita-de-esforcos.jpg"
                    sx={{ width: "5rem", height: "5rem", marginLeft: '1000px' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={5}>
              <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>Nome Completo</FormLabel>
              <Input
                type="text"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={5}>
              <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={4}>
              <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>Telefone</FormLabel>
              <Input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </PageWrapper>
  );
};

export default MinhaContaPage;
