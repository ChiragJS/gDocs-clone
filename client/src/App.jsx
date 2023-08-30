import { useState } from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import DocConnection from './component/DocConnection';
import DocumentEditor from './component/DocumentEditor';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
const exampleDocument = [
  {
      type:'paragraph',
      children : [{text:'A line of text in paragraph'}]
  },
  // {
  //     type:'h1',
  //     children : [{text:'A line of text in paragraph'}]
  // },
  // {
  //     type:'h2',
  //     children : [{text:'A line of text in paragraph'}]
  // },
  // {
  //     type:'paragraph',
  //     children : [{text:'A line of text in paragraph',bold:true,underline:true}]
  // }
]
function App() {
  const [document,updateDocument] = useState(exampleDocument);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<DocConnection />}/>
          <Route path='/document/:docId' element={<DocumentEditor document={document} onChange={updateDocument} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
