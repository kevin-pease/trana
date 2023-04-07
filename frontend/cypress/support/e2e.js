// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// Import commands.js using ES2015 syntax:

import './commands'
beforeEach(() => {
    // The following line is apparently needed because of strange network errors, this has occured during the e2e assignment as well.
    cy.request({method: 'GET', url: 'http://localhost:5000'});
    // Reset database
    cy.request({method: 'PUT', url: 'http://localhost:3000/reset_database'});
    // Visit website
    cy.visit('http://localhost:5000');
    // Click the `get started` button on the splash page
    cy.contains('GET STARTED').click();
    cy.wait(4);
    // Profile selection page should be visible
    cy.contains("Who's training?");
})
