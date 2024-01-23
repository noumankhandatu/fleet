import { MagnifyingGlass } from "react-loader-spinner";

const AppLoader = () => {
  return (
    <div>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper center"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};

export default AppLoader;
