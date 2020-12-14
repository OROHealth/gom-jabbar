db.createUser(
        {
            user: "DB_USER_TO_MOVE_INTO_ENV_FILE",
            pwd: "DB_PASSWORD_TO_MOVE_INTO_ENV_FILE",
            roles: [
                {
                    role: "readWrite",
                    db: "cariboudb"
                }
            ]
        }
);
