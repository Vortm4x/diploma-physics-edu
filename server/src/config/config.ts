export default {
    port: 8081,
    db: {
        database: "diploma_physics_edu",
        user: "diploma_physics_edu",
        password: "12345",
        options: {
            dialect: "postgres" as const,
            host: "localhost",
        },
    }
}