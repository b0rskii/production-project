import * as commonCommands from '../support/commands/common';
import * as profileCommands from '../support/commands/profile';
import * as articleCommands from '../support/commands/article';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);

export {};
