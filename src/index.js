Cypress.Commands.add('modifyXmlWithDefaultsAndBase64', (inputXml, options = {}) => {
  const { isBase64 = false, outputFilePath = inputXml } = options;

  let parsePromise;
  
  // Se for Base64, converte para string XML, caso contrário, lê o XML diretamente
  if (isBase64) {
    parsePromise = Promise.resolve(atob(inputXml)); // Decodifica Base64
  } else {
    parsePromise = cy.readFile(inputXml, 'utf-8'); // Lê arquivo XML normalmente
  }

  parsePromise.then((xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    // Modificando o campo dhEmi com a data atual
    const formattedDate = new Date().toISOString().split('T')[0]; // Data no formato YYYY-MM-DD
    const dhEmiElement = xmlDoc.getElementsByTagName('dhEmi')[0];
    if (dhEmiElement) {
      dhEmiElement.textContent = formattedDate;
    } else {
      cy.fail('Tag dhEmi not found in the XML.');
    }

    // Modificando o campo chNFe com um número aleatório
    const randomInvoiceNumber = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    const chNFeElement = xmlDoc.getElementsByTagName('chNFe')[0];
    if (chNFeElement) {
      chNFeElement.textContent = `3104${randomInvoiceNumber}087644401023099899897`; // Número da chave
    } else {
      cy.fail('Tag chNFe not found in the XML.');
    }

    // Serializando o XML modificado
    const serializer = new XMLSerializer();
    const newXmlString = serializer.serializeToString(xmlDoc);

    // Se for Base64, converte e salva em Base64, caso contrário, salva como XML normal
    if (isBase64) {
      const base64String = btoa(newXmlString); // Codifica para Base64
      cy.writeFile(outputFilePath, base64String); // Salva como Base64
    } else {
      cy.writeFile(outputFilePath, newXmlString); // Salva como XML normal
    }
  });
});
