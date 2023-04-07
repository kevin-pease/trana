//
//  Backend tests for all routes. Note that a database reset is executed before each test, as specified in  support/index.js
//

describe("Backend general", () => {
	// Statuscode NOT FOUND for GET invalid route
	it('should give a `not found` error', () => {
		cy.request({method: 'GET', url: '/invalidroute', failOnStatusCode: false})
		.its('status')
		.should('be.equal', 404);
	});
});

describe("Users", () => {
	// Statuscode OK for GET all users
	it('should get a list of all users', () => {
		cy.request({method: 'GET', url: '/users'})
		.its('status')
		.should('be.equal', 200);
	});
	// Length of results
	it('should return the correct results length', () => {
		cy.request({method: 'GET', url: '/users'})
        .its('body')
        .should('have.length', 4);
	});
	// Statuscode CREATED for POST new user
	it('should add a new user succesfully', () => {
		cy.request({method: 'POST', url: '/users', body:{"username":"TestUser", "profile_pic_id":"default"}})
		.its('status')
		.should('be.equal', 201)
	}) 
	// Statuscode BAD REQUEST for POST new user with incorrect number of arguments (fail)
	it('should *not* add a new user succesfully with incorrect arguments', () => {
		cy.request({method: 'POST', url: '/users', body:{"username":"TestUserFail"}, failOnStatusCode: false})
		.its('status')
		.should('be.equal', 400)
	}) 
});


describe("Exercises", () => {
	// Statuscode OK for GET exercises for a user
	it('should get a all exercises for a user', () => {
		cy.request({method: 'GET', url: '/users/4/exercises'})
		.its('status')
		.should('be.equal', 200);
	});
	// Statuscode NOT FOUND for GET exercises for a non-existent user
	it('should *not* get a all exercises for a non-existent user', () => {
		cy.request({method: 'GET', url: '/users/999/exercises', failOnStatusCode: false})
		.its('status')
		.should('be.equal', 404);
	});
	// Length of results
	it('should return the correct results length', () => {
		cy.request({method: 'GET', url: '/users/4/exercises'})
        .its('body')
        .should('have.length', 5);
	});
	// Statuscode CREATED for POST new exercise for user
	it('should add a new exercise succesfully for user', () => {
		cy.request({method: 'POST', url: '/users/4/exercises', body:{"name":"Test exercise", "date":"2022-07-22"}})
		.its('status')
		.should('be.equal', 201)
	}) 
	// Statuscode BAD REQUEST for POST new exercise with incorrect number of arguments (fail)
	it('should *not* add a new exercise succesfully with incorrect arguments', () => {
		cy.request({method: 'POST', url: '/users/4/exercises', body:{"name":"TestExerciseFail"}, failOnStatusCode: false})
		.its('status')
		.should('be.equal', 400)
	}) 
	// Statuscode OK for DELETE exercise
	it('should delete an exercise succesfully', () => {
		cy.request({method: 'DELETE', url: '/exercises/1'})
		.its('status')
		.should('be.equal', 200)
	}) 
	// Statuscode 404 for DELETE non-existent exercise
	it('should *not* delete an exercise succesfully', () => {
		cy.request({method: 'DELETE', url: '/exercises/999', failOnStatusCode: false})
		.its('status')
		.should('be.equal', 404)
	}) 
	// Statuscode OK for PUT exercise
	it('should edit an exercise succesfully', () => {
		cy.request({method: 'PUT', url: '/exercises/1', body:{"name":"Test exercise", "date":"2022-07-22"}})
		.its('status')
		.should('be.equal', 200)
	}) 
	// Statuscode BAD REQUEST for PUT exercise with incorrect number of arguments
	it('should *not* edit an exercise succesfully', () => {
		cy.request({method: 'PUT', url: '/exercises/1', body:{"name":"Test exercise"}, failOnStatusCode: false})
		.its('status')
		.should('be.equal', 400)
	}) 
	// Statuscode NOT FOUND for PUT non-existent exercise
	it('should *not* edit an exercise succesfully', () => {
		cy.request({method: 'PUT', url: '/exercises/999', body:{"name":"Test exercise", "date":"2022-07-22"}, failOnStatusCode: false})
		.its('status')
		.should('be.equal', 404)
	}) 
});