declare namespace NodeJS{
    export interface ProcessEnv {
        DATABASE_URL: string,
        USERNAME: string,
        PASSWORD: string,
        SECRET: string
    }
}