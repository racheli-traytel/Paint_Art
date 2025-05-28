import { createBrowserRouter } from 'react-router'
import PersonalArea from './components/PersonalArea'
import PaintedDrawings from './components/PaintedDrawings'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import TopRatedDrawings from './components/Popular'
import Layout from './components/Layout'
import PaintArtDashboard from './components/PaintArtDashboard'
import RecyclingBinPage from './components/RecyclingBinPage'
import PaintCanvas from './components/paint-canvas/index'
import { ColoringPageConverter } from './components/coloring-page-converter/index'
import SearchAndCategory from './components/SearchAndCategory'
import ArtUploader from './components/art-uploader/art-uploader'
export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      { path: 'coloring-page-converter', element:<ColoringPageConverter/>},

      { path:'drawings', element: <SearchAndCategory /> },
      { path:'popular', element: <TopRatedDrawings /> },

      { index:true, element: <SearchAndCategory /> },
      { path:':id', element: <PaintCanvas isPainted={false}/> },

      {
        path: '/personal-area', element: <PersonalArea/>,
        children:[
          {index:true , element:<PaintArtDashboard/>},
          { path: 'painted-drawings', element:<PaintedDrawings/> },
          { path: 'RecyclingBinPage', element:<RecyclingBinPage/> },
          { path: 'upload', element:<ArtUploader/> },
          { path: ':id', element:<PaintCanvas isPainted={true}/> },

        ]
      }
    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
 
]);