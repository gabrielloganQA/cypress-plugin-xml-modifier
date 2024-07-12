Aqui está uma versão aprimorada do README.md para o seu plugin:


# Cypress XML Modifier Plugin

[Cypress](https://www.cypress.io/) é uma ferramenta poderosa para testar aplicações web, e este plugin adiciona funcionalidades para modificar facilmente campos XML dentro dos seus testes Cypress. Com ele, você pode utilizar dois comandos personalizados: `modifyXmlField` e `modifyMultipleXmlFields`.

## Instalação

Para instalar o plugin, execute o seguinte comando:

```sh
npm install cypress-xml-modifier-plugin
```

## Uso

Primeiro, importe e registre o plugin no seu arquivo `cypress/support/e2e.js`:

```javascript
import 'cypress-xml-modifier-plugin';
```

### Comandos Disponíveis

#### `modifyXmlField`

Modifica um único campo XML.

**Parâmetros:**
- `filePath` (string): Caminho para o arquivo XML.
- `tagName` (string): Nome da tag que deve ser modificada.
- `newValue` (string): Novo valor para a tag.
- `outputFilePath` (string): Caminho para salvar o arquivo XML modificado.

**Exemplo de Uso:**

```javascript
cy.modifyXmlField('path/to/input.xml', 'TagName', 'NewValue', 'path/to/output.xml');
```

#### `modifyMultipleXmlFields`

Modifica múltiplos campos XML.

**Parâmetros:**
- `filePath` (string): Caminho para o arquivo XML.
- `modifications` (array de objetos): Lista de modificações a serem feitas. Cada objeto deve conter `tagName` e `newValue`.
- `outputFilePath` (string): Caminho para salvar o arquivo XML modificado.

**Exemplo de Uso:**

```javascript
const modifications = [
  { tagName: 'TagName1', newValue: 'NewValue1' },
  { tagName: 'TagName2', newValue: 'NewValue2' },
];

cy.modifyMultipleXmlFields('path/to/input.xml', modifications, 'path/to/output.xml');
```

### Notas

- Se a tag especificada não for encontrada no XML, o teste falhará imediatamente com uma mensagem de erro.
- Certifique-se de que os caminhos para os arquivos XML estejam corretos e que o Cypress tenha permissão para ler e escrever nesses caminhos.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests. Veja as [diretrizes de contribuição](CONTRIBUTING.md) para mais detalhes.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.