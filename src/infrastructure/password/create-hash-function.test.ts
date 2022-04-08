import createHashFunction from "./create-hash-function";
describe("hashFunction.hash", () => {
    it("has hash", async () => {
        const hashFunction = createHashFunction();
        expect(hashFunction).toHaveProperty("hash");
    });
    it("hashes correctly", async () => {
        const word = "house";
        const hashed = await createHashFunction().hash(word);
        expect(hashed).not.toBe("house");
    });
});
describe("hashFunction.verify", () => {
    it("has verify", async () => {
        const hashFunction = createHashFunction();
        expect(hashFunction).toHaveProperty("verify");
    });
    it("verifies correctly", async () => {
        const word = "house";
        const hashed = await createHashFunction().hash(word);
        const verified = await createHashFunction().verify(hashed, word);
        expect(verified).toBe(true);
    });
    it("verifies correctly 2", async () => {
        const word = "house";
        const verified = await createHashFunction().verify(word, word);
        expect(verified).toBe(false);
    });
});
