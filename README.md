# Cypress XML Modifier Plugin

[Cypress](https://www.cypress.io/) is a powerful tool for testing web applications, and this plugin adds functionality to easily modify XML fields within your Cypress tests. It provides two custom commands: `modifyXmlField` and `modifyMultipleXmlFields`.

## Installation

To install the plugin, run the following command:

```sh
npm install cypress-xml-modifier-plugin
```

## Usage

First, import and register the plugin in your `cypress/support/e2e.js` file:

```javascript
import 'cypress-xml-modifier-plugin';
```

### Available Commands

#### `modifyXmlField`

Modifies a single XML field.

**Parameters:**
- `filePath` (string): Path to the XML file.
- `tagName` (string): Name of the tag to be modified.
- `newValue` (string): New value for the tag.
- `outputFilePath` (string): Path to save the modified XML file.

**Usage Example:**

```javascript
cy.modifyXmlField('path/to/input.xml', 'TagName', 'NewValue', 'path/to/output.xml');
```

#### `modifyMultipleXmlFields`

Modifies multiple XML fields.

**Parameters:**
- `filePath` (string): Path to the XML file.
- `modifications` (array of objects): List of modifications to be made. Each object should contain `tagName` and `newValue`.
- `outputFilePath` (string): Path to save the modified XML file.

**Usage Example:**

```javascript
const modifications = [
  { tagName: 'TagName1', newValue: 'NewValue1' },
  { tagName: 'TagName2', newValue: 'NewValue2' },
];

cy.modifyMultipleXmlFields('path/to/input.xml', modifications, 'path/to/output.xml');
```

convertXmlToBase64
Converts an XML file to a Base64 encoded string.

Parameters:

filePath (string): Path to the XML file.
outputFilePath (string): Path to save the Base64 encoded string.
Usage Example:

```javascript
cy.convertXmlToBase64('path/to/input.xml', 'path/to/output.txt');
```

### Notes

- If the specified tag is not found in the XML, the test will fail immediately with an error message.
- Ensure that the paths to XML files are correct and that Cypress has permission to read from and write to these paths.

## Credits

This plugin was conceptualized by Hiago due to a specific application requirement involving XML. I Gabriel Logan implemented the code.

## Contributions

Contributions are welcome! Feel free to open issues and send pull requests. See the [contribution guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
