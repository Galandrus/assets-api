class Config {
    private static instance: Config;
    public readonly NODE_ENV: string;
    public readonly APP_PORT: string;

    constructor() {
        if (typeof Config.instance === 'object') {
            return Config.instance;
        }

        this.NODE_ENV = process.env.NODE_ENV;
        this.APP_PORT = process.env.APP_PORT;

        Config.instance = this;
        return this;
    }
}

const config = new Config();
Object.freeze(config);

export default config;
