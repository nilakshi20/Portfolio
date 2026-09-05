import { About } from './components/About'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Research } from './components/Research'
import { ScrollProgress } from './components/ScrollProgress'
import { Skills } from './components/Skills'
import { onSectionLinkClick, sectionPath } from './utils/sectionRoutes'
import './App.css'

function App() {
  return (
    <div className="app">
      <a
        className="skip-link"
        href={sectionPath('home')}
        onClick={(event) => onSectionLinkClick(event, 'home')}
      >
        Skip to content
      </a>
      <div className="site-chrome">
        <Navbar />
        <ScrollProgress />
      </div>
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Research />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
