const testRepository = ({ testDatasource }: any) => {
    return () => testDatasource();
};
export default testRepository;
