# DELTA CODE API

## Uma api para realizar transações e listar as mesmas por data, criada com base no seguinte figma:

<div align="center">
    <img src="https://github.com/delta-code-ltda/technical-challenges/blob/main/.github/assets/calendar-challenge-preview.jpg?raw=true" alt="Prévia do desafio de calendário da Delta Code" />
</div>

## Meu entendimento do projeto:

Analisando o figma pensei em criar uma plataforma onde um usuário pudesse se cadastrar, enviar, receber e listar transações. Ao se cadastrar todo usuário recebe R$10000,00 que pode utilizar para enviar quantias a outros usuários e listar essas transações passando uma data inicial e uma final que deseja retornar, permitindo listar um único dia, uma semana, um mês ou o período que a aplicação front-end precisar. Essa listagem é agrupada por dia, para permitir melhor visualização e manipulação de dados no front-end.

Em relação ao desenvolvimento, nunca havia utilizado Graphql ou ApolloServer e definitivamente foi uma experiência ótima aprender e colocar em prática nesse projeto, agradeço pelo incentivo para me dedicar e me desafiar a utilizar novas tecnologias.

### Regras de negócio:

- O email precisa ser válido ao se cadastrar e não pode ja ter sido cadastrado;
- O usuário pode fazer update e delete (soft delete) apenas de sua própria conta;
- A listagem do próprio perfil é a única forma de verificar o 'balance' para manter a privacidade;
- Ao enviar dinheiro, tenha certeza que possui saldo suficiente e que está enviando para outro usuário existente;
- Ao listar as transações o parâmetro "endDate" é opcional, se ele não for passado será listado apenas o dia "startDate", porém, se ele for passado tenha certeza de ser uma data posterior do "startDate". As datas são enviadas no formato yyyy-mm-dd seguindo o formato ISO;
- Usuários deletados não podem mais criar transações
- As funcionalidades exigem estar logado: retrieveUser, updateUser, deleteUser, createTransaction e listTransactions
- Utilize o token de acesso como um Bearer token;

Para executar o projeto renomeie o arquivo .env.example para apenas .env e se quiser utilizar docker apenas rode o comando `docker compose up --build` pelo terminal, caso queira iniciar o projeto sem docker, renomeie as variaveis de ambiente no .env para se adequar ao seu postgres, instale as depêndencias com o comando `yarn` e execute o projeto com o comando `yarn start` e acesse [http://localhost:4000](http://localhost:4000)

### Obrigado pela oportunidade! Espero que gostem do projeto!
