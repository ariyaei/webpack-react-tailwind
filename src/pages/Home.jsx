// Home
import { useEffect } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import setDynamicVH from '@utils/setDynamicVH'
import LogoWebpack from '@assets/images/svg/webpack.svg'
import LogoReact from '@assets/images/svg/react.svg'
import LogoTailwind from '@assets/images/svg/tailwind.svg'

const Home = () => {
  useEffect(() => {
    window.addEventListener('load', setDynamicVH)
    window.addEventListener('resize', setDynamicVH)

    return () => {
      window.removeEventListener('load', () => setDynamicVH)
      window.removeEventListener('resize', () => setDynamicVH)
    }
  }, [])

  return (
    <>
      <Header />
      <main className="bg-zinc-800">
        <div className=" container mx-auto">
          <h1 className="text-center py-5 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-400">
            Webpack Boilerplate (React + Tailwind CSS) Edition
          </h1>
          <h2 className="text-white flex justify-center items-center">
            <LogoWebpack />
            <LogoReact />
            <LogoTailwind />
          </h2>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home
