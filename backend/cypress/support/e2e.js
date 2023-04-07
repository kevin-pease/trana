beforeEach(function () {
	// Ask the server to reset the database to what's in schema.sql
	cy.request({method: 'PUT', url: '/reset_database'});
});
