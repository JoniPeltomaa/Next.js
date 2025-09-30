import React from 'react'
import { Header, Footer } from '@/app/components'
import Link from 'next/link'

export default function Login() {
  return (
    <div>
      <Header />
      <section className='lg:px-33 px-5 lg:my-20 my-10 flex justify-center items-center'>
        <div className='bg-[#050611e3] backdrop-blur-md w-[33rem] p-10 rounded-2xl'>
          <div className='mb-10'>
            <h1 className='lg:text-5xl text-4xl font-bold'>Kirjaudu Sisään 🔏</h1>
            <p className='font-normal text-sm mt-2'>Tervetuloa takaisin Jonin Blogi sivulle</p>
          </div>
          <form action="" className='space-y-5 relative'>
            <input type="email" placeholder='Sähköposti Osoite' className='border-3 border-[#e1d1ff7a] p-2 rounded-lg w-full outline-none'/>
            <input type='password' placeholder='Salasana' className='border-3 border-[#e1d1ff7a] p-2 rounded-lg w-full outline-none'/>
            <button className="lg:flex justify-center items-center bg-gradient-to-r from-indigo-500 to-pink-500 cursor-pointer text-[15px] font-bold px-6 py-3 rounded-full border-0 me-3 w-full">Kirjaudu Sisään <i className="fas fa-sign-in-alt ms-1"></i></button>
          </form>
          <p className='font-light text-xs text-center text-gray-300 mt-10'>Tarvitsetko tilin? <Link className='border-b border-dashed border-gray-300' href="/auth/register">Rekisteröidy</Link> </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}
