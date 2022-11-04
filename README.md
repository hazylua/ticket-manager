## Configuração

O repositório usa firebase para pegar os dados para popular o estado inicial da `store`.

O `serviceAccount.json` contém os dados da conta de serviço (service account) usada para autenticação do acesso na Firestore.

Os dados do arquivo são criptografados usando o modo de operação CBC com o IV e a chave secreta sendo guardados no .env conforme abaixo:

```plaintext
SERVICE_ENCRYPTION_IV="IV"
SERVICE_ENCRYPTION_KEY="KEY"
```

Os documentos guardados na Firestore seguem o seguinte formato, com o ID do documento sendo uma string UUID:

```json
{
    "client": "João",
    "description": "Ticket description.",
    "title": "Ticket title",
}
```

## Referência

- Guardando arquivos secretos de forma segura com criptografia em repositórios: <https://vercel.com/guides/how-do-i-workaround-vercel-s-4-kb-environment-variables-limit>
