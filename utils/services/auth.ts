import { getRequest, postRequest } from "../requests";

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface User {
  name: string;
  email: string;
  password: string;
  active: boolean;
  _id: string;
}

export function login(loginData: LoginPayload) {
  return postRequest<LoginPayload, { status: string; data: { user: User } }>(
    loginData,
    "users/login",
  );
}

export function logout() {
  return getRequest<void>("users/logout");
}

export function signUp(signupData: SignupPayload) {
  return postRequest<LoginPayload, { status: string; data: { user: User } }>(
    signupData,
    "users/signup",
  );
}

export function getAuthenticatedUser() {
  return getRequest<{ status: string; data: { data: User } }>("users/me");
}
