# 🚗 RentX - API de aluguel de carros

## Requisitos e Regras de negócio:

## Cadastro de carros:

**RF**
- [x] Deve ser possível cadastrar um novo carro;

**RN**
- [x] Não deve ser possível cadastrar um carro com uma placa já em uso;
- [x] O carro deve ser cadastrado, por padrão, com disponibilidade;
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador*;

## Listagem de carros:

**RF**
- [x] Deve ser possível listar todos os carros disponíveis;
- [x] Deve ser possível listar todos os carros disponíveis pelo nome do carro;
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da marca;
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria;

**RN**
- [x] Não deve ser necessário estar logado para listar os carros disponíveis;

## Cadastro de especificação no carro:

**RF**
- [ ] Deve ser possível cadastrar uma especificação para um carro;
- [ ] Deve ser possível listar todas as especificações;
- [ ] Deve ser possível listar todos os carros;

**RN**
- [ ] Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
- [ ] Não deve ser possível cadastrar uma especificação já existente no carro;
- [ ] O usuário responsável pelo cadastro deve ser um usuário administrador;

## Cadastro de imagens do carro:

**RF**
- [ ] Deve ser possível cadastrar a imagem do carro;
- [ ] Deve ser possível listar todos os carros;

**RNF**
- [ ] Utilizar o multer para upload dos arquivos;

**RN**
- [ ] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- [ ] O usuário responsável pelo cadastro deve ser um usuário administrador;

## Aluguel de carro:

**RF**
- [ ] Deve ser possível cadastrar um aluguel;

**RN**
- [ ] O aluguel deve ter duração mínima de 24 horas;
- [ ] Não deve ser possível cadastrar um novo aluguel já existe um aluguel em aberto para o mesmo usuário
- [ ] Não deve ser possível cadastrar um novo aluguel já existe um aluguel em aberto para o mesmo carro
