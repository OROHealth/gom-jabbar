// Import the dependencies for testing
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/server.ts");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Beer Order", () => {
    const userid = 101;
    describe("GET v1/order/:userid", () => {
        it("should instantiate an order to trigger the microservices (the robots) to work", (done) => {
            chai.request(app)
                .get(`v1/order/${userid}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("GET v1/beer/:userid", () => {
        it("should instantiate a beer order so that the Montroyashi knows who gets drunk", (done) => {
            chai.request(app)
                .get(`v1/beer/${userid}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('object');
                    done();
                });
        });
    });
});
