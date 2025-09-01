import LeftSidebar from './components/LeftSidebar.component';
import Form from './components/Form.component';

const App = () => {

  return (
    <div className="flex h-screen bg-white">
      <LeftSidebar />


      {/* Glavni sadržaj */}
      <div className="flex-1 flex flex-col">

        <Form />

      </div>

    </div>
  );
};

export default App;