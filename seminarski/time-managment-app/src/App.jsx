import LeftSidebar from './components/LeftSidebar';
import Form from './components/Form';

const App = () => {

  return (
    <div className="flex h-screen bg-white">
      <LeftSidebar />


      {/* Glavni sadržaj */}
      <div className="flex-1 flex flex-col">


        <Form />
        <Form />

      </div>
    </div>
  );
};

export default App;