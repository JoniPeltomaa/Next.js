"use client"
import React, { useState } from 'react'
import { Header, Footer } from '../components'
import { defaultArticle } from '../components/images'
import Image from 'next/image'
import Link from 'next/link';

export default function page() {
  const [categories, setCategories] = useState([
        { id: 1, title: "Technology", thumbnail: defaultArticle, slug: "technology" },
        { id: 2, title: "Health", thumbnail: defaultArticle, slug: "health" },
        { id: 3, title: "Lifestyle", thumbnail: defaultArticle, slug: "lifestyle" },
        { id: 4, title: "Travel", thumbnail: defaultArticle, slug: "travel" },
        { id: 5, title: "Nutrition", thumbnail: defaultArticle, slug: "nutrition" },
        { id: 6, title: "Fitness", thumbnail: defaultArticle, slug: "fitness" },
        { id: 7, title: "Business", thumbnail: defaultArticle, slug: "business" },
        { id: 8, title: "Education", thumbnail: defaultArticle, slug: "education" },
        { id: 9, title: "Entertainment", thumbnail: defaultArticle, slug: "entertainment" },
    ]);
  return (
    <div>
    <Header />
      <section className='lg:px-33 px-5 lg:my-30 my-10'>
        <div className='mb-10 relative'>
          <h1 className='lg:text-7xl text-4xl font-bold'>Kategoria</h1>
          <p className='italic font-normal text-sm mt-10 text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, dolore.</p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-10 justify-between mt-10'>
          {categories?.map((category, index) => (
            <Link href="#">
              <div className="w-full h-[5rem] relative">
                <Image width={100} height={100} src={category?.thumbnail} alt=" kategoria otsikko" className="w-full h-[5rem] object-cover absolute rounded-lg" />
                <div className="w-full h-[5rem] bg-[#0b0011cc] absolute rounded-lg" />
                <h1 className="text-xl font-semibold absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">{category.title}</h1>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
