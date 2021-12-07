# Cadastro de carro

**Requisitos funcionais**
Deve ser possível cadastrar um novo carro

**Regra de negócio**
Não deve ser possível cadastrar um carro com uma placa já existente
O carro deve ser cadastrado por padrão como disponível
Só pode ser possível cadastrar um carro sendo um usuário Admin

# Listagem de carro

**Requisitos funcionais**
Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pelo nome da categoria
Deve ser possível listar todos os carros disponíveis pelo nome da marca
Deve ser possível listar todos os carros disponíveis pelo nome do carro

**Regra de negócio**
O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**Requisitos funcionais**
Deve ser possível cadastrar uma especificação para um carro

**Regra de negócio**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
Só pode ser possível cadastrar uma especificação sendo um usuário Admin

# Cadastro de imagens do carro

**Requisitos funcionais**
Deve ser possível cadastrar a imagem do carro

**Requisitos não funcionais**
Utilizar o multer para upload de arquivo

**Regra de negócio**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
Só pode ser possível cadastrar uma imagem sendo um usuário Admin

# aluguel de carro

**Requisitos funcionais**
Deve ser possível cadastrar um aluguel

**Regra de negócio**
O aluguel deve ter duração miníma de 24 horas
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
O usuário deve estar logado
Ao realizar um aluguel o status do carro deve será alterado para indisponível

# Devolução de carro

**Requisitos funcionais**
Deve ser possível realizar a devolução de um carro

**Regra de negócio**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado a diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel
Ao realizar a devolução, deverá ser calculador o total do aluguel
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa porporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel
O usuário deve estar logado
