import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import SignalAnalysisPage from './pages/SignalAnalysisPage';
import LogsAndHistoryPage from './pages/LogsAndHistoryPage';


const Router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    <Route index element={<HomePage/>}/>
    <Route path='/data-analysis' element={<AnalysisPage/>}/>
    <Route path='/signal-analysis' element={<SignalAnalysisPage/>}/>
    <Route path='/logs-history' element={<LogsAndHistoryPage/>}/>
  </Route>
)
);

function App() {

  return (
    <>
      <RouterProvider router={Router} />
    </>
  )
}

export default App
