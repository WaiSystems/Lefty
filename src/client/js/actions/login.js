export function loginUser(userName) {
    return {
        type: "login",
        user: userName
    };
}