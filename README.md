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
- [x] Deve ser possível cadastrar uma especificação para um carro;

**RN**
- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
- [x] Não deve ser possível cadastrar uma especificação já existente no carro;
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador;

## Cadastro de imagens do carro:

**RF**
- [x] Deve ser possível cadastrar a imagem do carro;

**RNF**
- [x] Utilizar o multer para upload dos arquivos;

**RN**
- [x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador;

## Aluguel de carro:

**RF**
- [x] Deve ser possível cadastrar um aluguel;

**Rx**
- [x] O aluguel deve ter duração mínima de 24 horas;
- [x] Não deve ser possível cadastrar um novo aluguel já existe um aluguel em aberto para o mesmo usuário;
- [x] Não deve ser possível cadastrar um novo aluguel já existe um aluguel em aberto para o mesmo carro;
- [x] O usuário deve estar logado para cadastrar um novo aluguel;
- [x] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível;

## Devolução de carro:

**RF**
- [x] Deve ser possível realizar a devolução de um carro;

**RN**
- [x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa;
- [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel;
- [x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel;
- [x] Ao realizar a devolução, deverá ser calculado o total do aluguel;
- [x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso;
- [x] Caso haja multa, deverá ser somado ao total do aluguel;
- [x] O usuário deve estar logado para devolver o carro;
