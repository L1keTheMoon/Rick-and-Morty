import AppHeader from '../appHeader/AppHeader'
import AppFooter from '../appFooter/AppFooter'
import MainPage from '../../pages/main'
import Episodes from '../../pages/episodes'
import Episode from '../../pages/episode'
import Page404 from '../../pages/page404'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='app'>
      <AppHeader />
      <main className='app__content'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/character/:id' element={<MainPage />} />
          <Route path='/episodes' element={<Episodes />} />
          <Route path='/episodes/:id' element={<Episode />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}

export default App