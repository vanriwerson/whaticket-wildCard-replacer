const getWildCards = (customerObj) => {
  return Object.keys(customerObj).map((prop) => `{${prop}}`);
};

const seekWildCardsOnMessage = (message, wildCards) => {
  return wildCards.some((wildCard) => message.includes(wildCard));
};

const replaceWildCardsInMessage = (message, customerObj) => {
  const wildCards = getWildCards(customerObj)
  
  const messageHadWildCard = seekWildCardsOnMessage(message, wildCards);

  if(!messageHadWildCard) {
    return message;
  }
  
  console.log('supportedWildCards:', wildCards);
  let replacedWildCardsMessage = message;

  wildCards.forEach((wildCard) => {   
    const replaceKey = wildCard.replace(/[{}]/g,"");

    const replaceValue = customerObj[replaceKey];

    replacedWildCardsMessage = replacedWildCardsMessage.replace(wildCard, replaceValue);
  })

  return replacedWildCardsMessage;
};

export default replaceWildCardsInMessage;

// const ticketUser = {
//   id: 'protocoloDeAtendimentoBlaBlaBla',
//   name: 'Bruno',
// };

// const msg = 'Olá, {name}. Seu protocolo de atendimento é {id}';
// const noWildCardMsg = 'Não há wild cards aqui.'

// console.log(replaceWildCardsInMessage(msg, ticketUser));
// console.log(replaceWildCardsInMessage(noWildCardMsg, ticketUser));
