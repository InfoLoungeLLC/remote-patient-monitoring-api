"use strict";
import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.region
});
var docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10"
});
import PatientTable from "../aws/patientTable";
import Validator from "../util/validator";
import Formatter from "../util/formatter";

export namespace Patient {
  export async function getPatients(event: any, context: any, callback: Function) {
    const patientTable = new PatientTable(docClient);
    const validator = new Validator();
    const formatter = new Formatter();
    try {
      const res = await patientTable.getPatients();
      if (validator.checkDyanmoQueryResultEmpty(res)) {
        const errorModel = {
          errorCode: "RPM00001",
          errorMessage: "Not Found",
        };
        callback(null, {
          statusCode: 404,
          body: JSON.stringify({
            errorModel,
          }),
        });
      }
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      });
    } catch (err) {
      console.log("getPatientTable-index error");
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err
        }),
      });
    }
  }

  export async function postPatient(event: any, context: any, callback: Function) {
    console.log('called postPatient');
    const patientTable = new PatientTable(docClient);
    const validator = new Validator();
    try {
      if (!validator.checkPatientBody(JSON.parse(event.body))) {
        const errorModel = {
          errorCode: "RPM00002",
          errorMessage: "Invalid Body",
        };
        callback(null, {
          statusCode: 400,
          body: JSON.stringify({
            errorModel,
          }),
        });
      }
      const res = await patientTable.postPatient(JSON.parse(event.body));
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      });
    } catch (err) {
      console.log("postPatientTable-index error");
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err
        }),
      });
    }
  }

  export async function getPatient(event: any, context: any, callback: Function) {
    const patientTable = new PatientTable(docClient);
    const validator = new Validator();
    const formatter = new Formatter();
    console.log('call getPatient with ' + event.pathParameters.patientId);
    try {
      const res = await patientTable.getPatient(event.pathParameters.patientId);
      console.log(res);
      if (validator.checkDynamoGetResultEmpty(res)) {
        const errorModel = {
          errorCode: "RPM00001",
          errorMessage: "Not Found",
        };
        callback(null, {
          statusCode: 404,
          body: JSON.stringify({
            errorModel,
          }),
        });
      }
      console.log(res);
      console.log(JSON.stringify(res));
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      });
    } catch (err) {
      console.log("getPatientTable-index error");
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err
        }),
      });
    }
  }

  export async function putPatient(event: any, context: any, callback: Function) {
    const patientTable = new PatientTable(docClient);
    const validator = new Validator();
    try {
      if (!validator.checkPatientBody(JSON.parse(event.body))) {
        const errorModel = {
          errorCode: "RPM00002",
          errorMessage: "Invalid Body",
        };
        callback(null, {
          statusCode: 400,
          body: JSON.stringify({
            errorModel,
          }),
        });
      }
      const res = await patientTable.putPatient(
        event.pathParameters.patientId,
        JSON.parse(event.body)
      );
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      });
    } catch (err) {
      console.log("putPatientTable-index error");
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err
        }),
      });
    }
  }
}