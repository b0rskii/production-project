import * as commonCommands from '../support/commands/common';
import * as profileCommands from '../support/commands/profile';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);

export {};
