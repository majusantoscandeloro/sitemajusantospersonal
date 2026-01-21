# URLs de Retorno do Mercado Pago

Configure as seguintes URLs no backend do Mercado Pago (campo `back_urls`):

## URLs de Retorno

```json
{
  "back_urls": {
    "success": "https://sitemajusantospersonal.vercel.app/success",
    "pending": "https://sitemajusantospersonal.vercel.app/pending",
    "failure": "https://sitemajusantospersonal.vercel.app/failure"
  }
}
```

## Parâmetros Recebidos

As páginas de retorno recebem os seguintes parâmetros via query string:

### Success (/success)
- `payment_id` - ID do pagamento
- `status` - Status do pagamento (approved)
- `preference_id` - ID da preferência

### Pending (/pending)
- `payment_id` - ID do pagamento
- `status` - Status do pagamento (pending)
- `preference_id` - ID da preferência

### Failure (/failure)
- `payment_id` - ID do pagamento
- `status` - Status do pagamento (rejected)
- `status_detail` - Detalhes do status (ex: cc_rejected_insufficient_amount)
- `preference_id` - ID da preferência

## Exemplo de Implementação no Backend

```javascript
const preference = {
  items: [...],
  back_urls: {
    success: "https://sitemajusantospersonal.vercel.app/success",
    pending: "https://sitemajusantospersonal.vercel.app/pending",
    failure: "https://sitemajusantospersonal.vercel.app/failure"
  },
  auto_return: "approved" // Redireciona automaticamente quando aprovado
};
```
