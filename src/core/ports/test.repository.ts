const testRepository = ({ testDatasource }: any) => {
    console.log("YES");
    testDatasource();
    return () => testDatasource();
};
export default testRepository;
