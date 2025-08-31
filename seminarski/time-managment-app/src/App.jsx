import LeftSidebar from './components/LeftSidebar';
import Form from './components/Form';

const App = () => {

  return (
    <div className="flex h-screen bg-white">
      <LeftSidebar />


      {/* Glavni sadržaj */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b-2 border-black p-4 flex justify-between items-center">
          <div className="flex space-x-2">
            {/* ADD */}
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            {/* DELETE */}
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>
        </div>

        <Form />

      </div>
    </div>
  );
};

export default App;