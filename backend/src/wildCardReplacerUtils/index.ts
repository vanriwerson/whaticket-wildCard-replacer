import Ticket from "../models/Ticket";

const replaceSpecialChars = (string: any) => {
  let str = string;
  str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
  str = str.replace(/[àáâãäå]/g,"a");

  str = str.replace(/[ÈÉÊË]/g,"E");
  str = str.replace(/[èéêẽ]/g,"e");

  str = str.replace(/[ÌÍÎĨ]/g,"I");
  str = str.replace(/[ìíîĩ]/g,"i");

  str = str.replace(/[ÒÓÔÕ]/g,"O");
  str = str.replace(/[òóôõ]/g,"o");

  str = str.replace(/[ÙÚÛŨ]/g,"U");
  str = str.replace(/[ùúûũ]/g,"e");

  str = str.replace(/[Ç]/g,"C");
  str = str.replace(/[ç]/g,"c");

  return str.replace(/[^a-z0-9]/gi,'').toLowerCase();
};

const getWildCardsFromTicket = (data: Ticket) => {
  const wildCardsFromTicket = {
    id: data.id,
    user: data.user.name || "",
    queue: data.queue.name || "",
    customer: data.contact.name,
  };

  const extraInfo = data.contact.extraInfo;
  let wildCardsFromExtraInfo = {};

  if (extraInfo.length) {
    wildCardsFromExtraInfo = extraInfo.reduce((acc: any, { name, value }: any) => {
      acc = { ...acc, [replaceSpecialChars(name)]: value }
      return acc;
    }, {});
  }

  return { ...wildCardsFromTicket, ...wildCardsFromExtraInfo };
};

const getWildCards = (customerObj: any) => {
  return Object.keys(customerObj).map((prop) => `{${prop}}`);
};

const seekWildCardsOnMessage = (message: string, wildCards: any) => {
  return wildCards.some((wildCard: string) => message.includes(wildCard));
};

const replaceWildCardsInMessage = (message: string, customerObj: any) => {
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

const prepareMessage = (data: any, message: string): string => {
  const wildCardsFromTicket = getWildCardsFromTicket(data);
  const preparedMessage = replaceWildCardsInMessage(message, wildCardsFromTicket);

  return preparedMessage;
}

export default prepareMessage;
