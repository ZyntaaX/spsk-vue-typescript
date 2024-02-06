// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import router from "../index"

export function userExists(_to: any, _from: any, next: any): void {
    // eslint-disable-next-line no-constant-condition
    if (true) {
        console.log("User does NOT exist");
        // router.push({ name: 'UserPage', params: { userid: -1 }, query: { exists: "false" } })
        next();
    } else {
        next();
    }
}
