export abstract class IQuery {
    abstract forbidden(): string | Promise<string>;
    abstract allowed(): string | Promise<string>;
    abstract ctxUser(): string | Promise<string>;
    abstract validationError(): string | Promise<string>;
    abstract hello(name?: string): string | Promise<string>;
    abstract temp__(): boolean | Promise<boolean>;
}
