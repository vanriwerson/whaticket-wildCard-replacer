const replaceSpecialChars = (string) => {
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

export default replaceSpecialChars;

// console.log(replaceSpecialChars('João Emílio Pescoço'));