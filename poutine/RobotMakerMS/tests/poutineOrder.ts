// Import the dependencies for testing
const chai = require("chai");
const chaiHttp = require("chai-http");
import app from "../src/server";

// Configure chai
chai.use(chaiHttp);
chai.should();


describe("Poutine Order", () => {
    const userid = 100;
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
});
