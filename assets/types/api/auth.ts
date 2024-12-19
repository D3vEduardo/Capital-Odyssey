export type ResponseApiAuth = {
    returnType: "error" | "success";
    returnMessage: string;
}

export type ResponseApiAuthGet = ResponseApiAuth & {
    accessToken?: string;
}