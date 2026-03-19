import './App.css'
import { useTranslation } from 'react-i18next';


function App() {

  const { t } = useTranslation();
  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
          <h1>{t('welcome')}</h1>;
        </div>
      </section>
    </>
  )
}

export default App
