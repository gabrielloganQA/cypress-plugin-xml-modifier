import { DOMParser, XMLSerializer } from 'xmldom';

Cypress.Commands.add('modifyXmlWithDefaults', (inputXml, options = {}) => {
  const { isBase64 = false, outputFilePath = inputXml } = options;

  let parsePromise;
  if (isBase64) {
    parsePromise = Promise.resolve(atob(inputXml));
  } else {
    parsePromise = cy.readFile(inputXml, 'utf-8');
  }

  parsePromise.then((xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    const formattedDate = new Date().toISOString().split('T')[0];
    const dhEmiElement = xmlDoc.getElementsByTagName('dhEmi')[0];
    if (dhEmiElement) {
      dhEmiElement.textContent = formattedDate;
    } else {
      cy.fail('Tag dhEmi not found in the XML.');
    }

    const randomInvoiceNumber = String(Math.floor(Math.random() * 1000000)).padStart(6, '0'); // Número com 6 dígitos
    const chNFeElement = xmlDoc.getElementsByTagName('chNFe')[0];
    if (chNFeElement) {
      chNFeElement.textContent = `3104${randomInvoiceNumber}087644401023099899897`;
    } else {
      cy.fail('Tag chNFe not found in the XML.');
    }

    const serializer = new XMLSerializer();
    const newXmlString = serializer.serializeToString(xmlDoc);

    if (isBase64) {
      const base64String = btoa(newXmlString);
      cy.writeFile(outputFilePath, base64String);
    } else {
      cy.writeFile(outputFilePath, newXmlString);
    }
  });
});

Cypress.Commands.add('modifyXmlField', (filePath, tagName, newValue, outputFilePath) => {
  cy.readFile(filePath, 'utf-8').then((xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    const elements = xmlDoc.getElementsByTagName(tagName);
    if (elements.length > 0) {
      elements[0].textContent = newValue;
    } else {
      cy.fail(`Tag ${tagName} not found in the XML.`);
    }

    const serializer = new XMLSerializer();
    const newXmlString = serializer.serializeToString(xmlDoc);
    cy.writeFile(outputFilePath, newXmlString);
  });
});

Cypress.Commands.add('modifyMultipleXmlFields', (filePath, modifications, outputFilePath) => {
  cy.readFile(filePath, 'utf-8').then((xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    modifications.forEach(mod => {
      const elements = xmlDoc.getElementsByTagName(mod.tagName);
      if (elements.length > 0) {
        elements[0].textContent = mod.newValue;
      } else {
        cy.fail(`Tag ${mod.tagName} not found in the XML.`);
      }
    });

    const serializer = new XMLSerializer();
    const newXmlString = serializer.serializeToString(xmlDoc);
    cy.writeFile(outputFilePath, newXmlString);
  });
});

Cypress.Commands.add('convertXmlToBase64', (filePath, outputFilePath) => {
  cy.readFile(filePath, 'utf-8').then((xmlString) => {
    const base64String = btoa(xmlString);
    cy.writeFile(outputFilePath, base64String);
  });
});
