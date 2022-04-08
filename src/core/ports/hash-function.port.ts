interface HashFunction {
    hash(password: string): Promise<string>;
    verify(hashed: string, password: string): Promise<boolean>;
}

export default HashFunction;
