declare namespace NodeJS{
    export interface ProcessEnv {
        DATABASE_URL: string,
        USERNAME: string,
        PASSWORD: string,
        SECRET: string,
        NODE_ENV: string,
        EMAILJS_PUBLIC: string,
        TEMPLATE_ID: string,
        SERVICE_ID: string
    }
}