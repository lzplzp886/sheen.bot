// src/hooks/useCognitoSignup.ts

import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
  } from "amazon-cognito-identity-js";
  import userPool from "@/lib/cognitoClient";
  
  type SignupParams = {
    username: string;
    password: string;
    email: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  };
  
  export function useCognitoSignup() {
    // signUp
    async function signUpUser(params: SignupParams) {
      const {
        username,
        password,
        email,
        phoneNumber,
        firstName,
        lastName,
        role
      } = params;
  
      return new Promise((resolve, reject) => {
        const attributeList = [
          new CognitoUserAttribute({ Name: "email", Value: email }),
          new CognitoUserAttribute({ Name: "phone_number", Value: phoneNumber || "" }),
          new CognitoUserAttribute({ Name: "given_name", Value: firstName || "" }),
          new CognitoUserAttribute({ Name: "family_name", Value: lastName || "" }),
        ];
        if (role) {
          attributeList.push(new CognitoUserAttribute({ Name: "custom:role", Value: role }));
        }
  
        userPool.signUp(
          username,
          password,
          attributeList,
          [],
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
      });
    }
  
    // confirmVerification
    async function confirmUser(username: string, code: string) {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });
  
      return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(code, true, (err, data) => {
          if (err) return reject(err);
          resolve(data);
        });
      });
    }
  
    // autoLogin
    async function autoLogin(username: string, password: string) {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });
      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });
  
      return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
          onSuccess: (session) => {
            // 这里可以获取 userAttrs 等
            cognitoUser.getUserAttributes((attrErr, attrs) => {
              if (attrErr) {
                return resolve({ session, role: "" });
              }
              let finalRole = "";
              if (attrs) {
                for (const a of attrs) {
                  if (a.getName() === "custom:role") {
                    finalRole = a.getValue();
                    break;
                  }
                }
              }
              resolve({ session, role: finalRole });
            });
          },
          onFailure: (err) => {
            reject(err);
          },
        });
      });
    }
  
    return {
      signUpUser,
      confirmUser,
      autoLogin,
    };
  }
  