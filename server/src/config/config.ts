export default {
    port: 8081,
    db: {
        database: "diploma-physics-edu",
        user: "diploma-physics-edu",
        password: "12345",
        options: {
            dialect: "postgres" as const,
            host: "localhost",
        },
    }
}