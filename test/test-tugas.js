
const request = require('supertest');
const assert = require('chai').assert;
const chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs');

describe('API Test for "reqres.in"', () => {

    const BASE_URL = "https://reqres.in/api/"

    // get
    it('Test - GET Single Users', async () => {
        const response = await request(BASE_URL)
            .get("users/2")

        // assertion
        assert.equal(response.statusCode, 200)
        assert.equal(response.body.data.id, '2')
        assert.equal(response.body.data.email, 'janet.weaver@reqres.in')

        // json schema
        const schemaPathGet = "resources/get-object-schema.json";
        const jsonSchemaGet = JSON.parse(fs.readFileSync(schemaPathGet, 'utf8'))

        assert.jsonSchema(response.body, jsonSchemaGet);
    });

    // post
    it('Test - POST Create Users', async () => {
        const body = {
            "name": "morpheus",
            "job": "leader"
        }

        const response = await request(BASE_URL)
            .post("users")
            .send(body);

        const schemaPathPost = "resources/post-object-schema.json";
        const jsonSchemaPost = JSON.parse(fs.readFileSync(schemaPathPost, 'utf8'))

        assert.jsonSchema(response.body, jsonSchemaPost);
    });

    // put
    it('Test - PUT Update Users', async () => {
        const body = {
            "name": "morpheus",
            "job": "zion resident"
        }

        const response = await request(BASE_URL)
            .put("users/2")
            .send(body);

        const schemaPathPut = "resources/put-object-schema.json";
        const jsonSchemaPut = JSON.parse(fs.readFileSync(schemaPathPut, 'utf8'))

        assert.jsonSchema(response.body, jsonSchemaPut);
    })

    // delete
    it('Test - DELETE Certain Users', async () => {

        const response = await request(BASE_URL)
            .delete("users/2");

        console.log(response.statusCode);

        const schemaPathDelete = "resources/delete-object-schema.json";
        const jsonSchemaDelete = JSON.parse(fs.readFileSync(schemaPathDelete, 'utf8'))

        assert.jsonSchema(response.body, jsonSchemaDelete);
    })
});