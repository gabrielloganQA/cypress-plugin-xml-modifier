import { DOMParser, XMLSerializer } from 'xmldom';

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
