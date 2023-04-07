"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
const cdk = require("@aws-cdk/core");
const Infra = require("../lib/go-lambda-stack");
test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Infra.GoLambdaStack(app, 'GoLambdaStack');
    // THEN
    (0, assert_1.expect)(stack).to((0, assert_1.matchTemplate)({
        "Resources": {}
    }, assert_1.MatchStyle.EXACT));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmEudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZnJhLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBaUY7QUFDakYscUNBQXFDO0FBQ3JDLGdEQUFnRDtBQUVoRCxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtJQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxQixPQUFPO0lBQ1AsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM1RCxPQUFPO0lBQ1AsSUFBQSxlQUFTLEVBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUEsc0JBQWEsRUFBQztRQUNoQyxXQUFXLEVBQUUsRUFBRTtLQUNoQixFQUFFLG1CQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUN6QixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cGVjdCBhcyBleHBlY3RDREssIG1hdGNoVGVtcGxhdGUsIE1hdGNoU3R5bGUgfSBmcm9tICdAYXdzLWNkay9hc3NlcnQnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgSW5mcmEgZnJvbSAnLi4vbGliL2dvLWxhbWJkYS1zdGFjayc7XG5cbnRlc3QoJ0VtcHR5IFN0YWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4gICAgLy8gV0hFTlxuICAgIGNvbnN0IHN0YWNrID0gbmV3IEluZnJhLkdvTGFtYmRhU3RhY2soYXBwLCAnR29MYW1iZGFTdGFjaycpO1xuICAgIC8vIFRIRU5cbiAgICBleHBlY3RDREsoc3RhY2spLnRvKG1hdGNoVGVtcGxhdGUoe1xuICAgICAgXCJSZXNvdXJjZXNcIjoge31cbiAgICB9LCBNYXRjaFN0eWxlLkVYQUNUKSlcbn0pO1xuIl19