class Config {
    private static instance: Config;
    public readonly NODE_ENV: string;
    public readonly APP_PORT: string;
    public readonly MYSQL_HOST: string;
    public readonly MYSQL_PORT: string;
    public readonly MYSQL_USERNAME: string;
    public readonly MYSQL_PASS: string;
    public readonly MYSQL_DATABASE: string;
    public readonly CORS_ORIGINS: string;

    constructor() {
        if (typeof Config.instance === 'object') {
            return Config.instance;
        }

        this.NODE_ENV = process.env.NODE_ENV;
        this.APP_PORT = process.env.APP_PORT;
        this.MYSQL_HOST = process.env.MYSQL_HOST;
        this.MYSQL_PORT = process.env.MYSQL_PORT;
        this.MYSQL_USERNAME = process.env.MYSQL_USERNAME;
        this.MYSQL_PASS = process.env.MYSQL_PASS;
        this.MYSQL_DATABASE = process.env.MYSQL_DATABASE;
        this.CORS_ORIGINS = process.env.CORS_ORIGINS;

        Config.instance = this;
        return this;
    }
}

const config = new Config();
Object.freeze(config);

export default config;
