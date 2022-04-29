# LogisticaDM112

## Projeto:
Projeto criado com a intenção de se ligar a módulos de pedidos e pagamentos, como em uma loja.

## Configurações:
A base de dados pode ser modificada em "connection.js". Originalmente criada para conectar-se em uma database postgres.

A aplicação está, atualmente, rodando na porta 3000, o que pode ser modificado em "index.js".

Um dump simples, criado em SQL, dialeto Postgres, pode ser utilizado para testar a aplicação. Também foram fornecidos scripts para a criação de pedidos, o que seria responsabilidade do módulo PedidosDM112.

## Arquitetura
Pensado em repository design pattern, esta aplicação possui três camadas: um modelo, repository, que trata diretamente com o banco de dados, e serviços, que trata das regras de negócio.

## Endpoints

### GET: /api/delivery/?filter=${}&value=${}
Responsável por listar entregas. Traz uma lista de todas as entregas usualmente, mas também tem dois parâmetros opcionais que possibilitam sua filtragem por valores de todas as colunas da tabela delivery, com os formatos devidos de seus datatypes.

## POST: /api/delivery/:order_id
Responsável por criar uma nova entrega. Usualmente é acessado pelo próprio serviço de Pagamentos, uma vez que, assim que o pagamento é confirmado, o pedido vai para a entrega. O parâmetro escolhido é o id do pedido, que fica atrelado um a um com a entrega.

Ao ser criado, a entrega não terá maior parte de seus valores.

## PATCH: /api/delivery/:id/?receiver_cpf=${}
Responsável por atualizar o estado da entrega. Acessado uma vez, ele registrará o instante em que o processo de entrega começou. Acessado pela segunda vez, ele registrará a hora da entrega efetiva. Para tanto, é necessário que o parâmetro query receiver_cpf inclua o número de cpf do recebedor. Depois do processo, este endpoint ficará desabilitado.

Este endpoint também acessa o módulo Mensageiro, que envia um email para o cliente estabelecendo que sua entrega foi realizada.


## Para rodar:

1 - Instalar Node
2 - Instalar um banco de dados de sua preferência
3 - Intalar um cliente de sua preferência

Para instalar as dependências, rode `npm i`
Para rodar no modo de desenvolvimento em live reload `npm run dev`
Para rodar de maneira simples `node index.js`