const host = process.env.SERVER;
const port = process.env.SERVER_PORT;

const config = {
    server: {
        host: host,
        port: port
    },
    initialState: {
        department: {
            data: [],
            errors: null,
            fetching: false
        },
        employee: {
            data: [],
            errors: null,
            fetching: false
        },
    }
}
export default config;