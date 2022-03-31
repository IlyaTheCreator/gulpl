import Layout from "./components/Layout/Layout";
import ModalWindows from "./components/ModalWindows";

const App = () => {
  return (
    <>
      <ModalWindows />
      <Layout>
        <div className="temporary-content">
          <h1>hello</h1>
          <p>let's rock</p>
        </div>
      </Layout>
    </>
  );
};

export default App;
