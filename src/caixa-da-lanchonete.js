const CARDAPIO = {
    cafe: 3.0,
    chantily: 1.5,
    suco: 6.2,
    sanduiche: 6.5,
    queijo: 2,
    salgado: 7.25,
    combo1: 9.5,
    combo2: 7.5,
  };
  
  // Aplicar taxas ou descontos
  const MULTTIPLICADOR_MEIO_DE_PAGAMENTO = {
    dinheiro: 0.95,
    debito: 1,
    credito: 1.03,
  };
  
  // map de extra pra se tornar exclusivo desses principaiss
  const EXTRA_PRINCIPAL_MAP = {
    chantily: "cafe",
    queijo: "sanduiche",
  };
  
  class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
      if (itens.length == 0)
       return "Não há itens no carrinho de compra!";
  
      const itensPassados = new Set();
      
      let total = 0.0;
  
      for (let i = 0; i < itens.length; i++) {
        const itemAtual = itens[i];
  
        const nomeItem = itemAtual.split(",")[0];
        const quantidade = parseInt(itemAtual.split(",")[1]);
  
        if (quantidade == 0)
         return "Quantidade inválida!";
        if (CARDAPIO[nomeItem] == undefined)
         return "Item inválido!";
        if (MULTTIPLICADOR_MEIO_DE_PAGAMENTO[metodoDePagamento] == undefined)
         return "Forma de pagamento inválida!";
  
        const precoDoItem = CARDAPIO[nomeItem];
  
        // soma dos valores
        total += precoDoItem * quantidade;
  
        // add itens que foram comprados
        itensPassados.add(nomeItem);
      }
  
      // aplicando taxas ou descontos
      total *= MULTTIPLICADOR_MEIO_DE_PAGAMENTO[metodoDePagamento];
  
      // Verificar se o extra já foi comprado e se o principal tambem foi
      for (const [extra, principal] of Object.entries(EXTRA_PRINCIPAL_MAP)) {
        if (itensPassados.has(extra) && !itensPassados.has(principal))
          return "Item extra não pode ser pedido sem o principal";
      }
  
      // transformar o valor total de float para umaa string com 2 digitos decimais
      return "R$ " + total.toFixed(2).replace(".", ",");
    }
  }
  
  export { CaixaDaLanchonete };
  