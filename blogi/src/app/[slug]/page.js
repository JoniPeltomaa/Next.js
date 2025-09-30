import React from 'react'
import { Header, Footer, Category } from '../components'
import Image from 'next/image'
import { defaultArticle, defaultAvatar } from '../components/images'
import { formatDate } from '@/lib/utils';


export default function page() {
        const article = {
            title: "How to Write Engaging Blog Content",
            content: "In this guide, we break down actionable strategies for writing blog posts that capture attention...",
            thumbnail: defaultArticle,
            slug: "how-to-write-engaging-blog-content",
            views: 120,
            read_time: 5,
            category: { title: "Writing Tips", thumbnail: defaultArticle, slug: "writing-tips" },
            author: { full_name: "Jennifer Adga", image: defaultAvatar, job_title: "Writer at Desphixs" },
        };

        const comments = [
            {
                profile: {
                    full_name: "Nora Michaels",
                    image: defaultAvatar,
                },
                article_id: 1,
                comment: "Really insightful post! The tips on writing engaging content are spot on.",
                date_created: "2025-03-22T10:30:00Z",
            },
            {
                profile: {
                    full_name: "James Ortega",
                    image: defaultAvatar,
                },
                article_id: 1,
                comment: "Thanks for breaking it down clearly. I especially liked the section on SEO basics.",
                date_created: "2025-03-22T12:15:00Z",
            },
            {
                profile: {
                    full_name: "Lydia Tran",
                    image: defaultAvatar,
                },
                article_id: 1,
                comment: "Great read! Looking forward to trying some of these techniques in my own writing.",
                date_created: "2025-03-22T13:45:00Z",
            },
        ];

  return (
    <div>
        <Header />
        <section className="lg:px-33 px-5 my-20 z-10 relative">
            <div className="relative w-full h-[30rem]">
                <Image width={100} height={100} src={defaultArticle} alt="" className=" w-full h-[30rem] object-cover absolute rounded-2xl" />
                <div className="w-full h-[30rem] absolute bg-[#000000c3] rounded-2xl" />
                <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center text-5xl font-semibold leading-[4rem] drop-shadow-lg">Blogi Otsikko</h1>
            </div>
            <div className="flex items-center gap-3 mt-10">
                <button className="p-2 px-4 bg-indigo-800 rounded-lg"><i className="fas fa-thumbs-up"></i></button>
                <button className="p-2 px-4 bg-indigo-800 rounded-lg"><i className="fas fa-bookmark"></i></button>
                <div className="p-2 px-4 bg-indigo-800 rounded-lg">
                    <i className="fas fa-eye me-1"></i>0 Nähnyt
                </div>
                <div className="p-2 px-4 bg-indigo-800 rounded-lg">
                    <i className="fas fa-clock me-1"></i>2 min luettu
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10 my-10">
                <div >
                    <div className="bg-[#07050dd3] p-4 rounded-3xl backdrop-blur-sm ">
                        <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ratione delectus repellat sapiente reprehenderit eligendi accusamus soluta odio deleniti atque? In rerum, hic pariatur mollitia natus tempora ducimus rem sed corrupti, quo enim obcaecati eveniet dicta officiis odio fugiat unde perspiciatis ratione tempore labore iste sint? Distinctio, blanditiis, accusantium ipsa consequatur sunt et ipsam, facilis eaque aperiam dolorem mollitia? Quas tenetur id eligendi iusto fuga harum illo, eius, dolorum sit obcaecati dolore deserunt animi a atque, impedit natus dicta? Quaerat quod dolores molestias sint debitis, dicta nemo tempora vero ea rerum quasi, aliquid animi sit laudantium iusto praesentium nisi atque!</p>
                        <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ratione delectus repellat sapiente reprehenderit eligendi accusamus soluta odio deleniti atque? In rerum, hic pariatur mollitia natus tempora ducimus rem sed corrupti, quo enim obcaecati eveniet dicta officiis odio fugiat unde perspiciatis ratione tempore labore iste sint? Distinctio, blanditiis, accusantium ipsa consequatur sunt et ipsam, facilis eaque aperiam dolorem mollitia? Quas tenetur id eligendi iusto fuga harum illo, eius, dolorum sit obcaecati dolore deserunt animi a atque, impedit natus dicta? Quaerat quod dolores molestias sint debitis, dicta nemo tempora vero ea rerum quasi, aliquid animi sit laudantium iusto praesentium nisi atque!</p>
                        <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ratione delectus repellat sapiente reprehenderit eligendi accusamus soluta odio deleniti atque? In rerum, hic pariatur mollitia natus tempora ducimus rem sed corrupti, quo enim obcaecati eveniet dicta officiis odio fugiat unde perspiciatis ratione tempore labore iste sint? Distinctio, blanditiis, accusantium ipsa consequatur sunt et ipsam, facilis eaque aperiam dolorem mollitia? Quas tenetur id eligendi iusto fuga harum illo, eius, dolorum sit obcaecati dolore deserunt animi a atque, impedit natus dicta? Quaerat quod dolores molestias sint debitis, dicta nemo tempora vero ea rerum quasi, aliquid animi sit laudantium iusto praesentium nisi atque!</p>
                        <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ratione delectus repellat sapiente reprehenderit eligendi accusamus soluta odio deleniti atque? In rerum, hic pariatur mollitia natus tempora ducimus rem sed corrupti, quo enim obcaecati eveniet dicta officiis odio fugiat unde perspiciatis ratione tempore labore iste sint? Distinctio, blanditiis, accusantium ipsa consequatur sunt et ipsam, facilis eaque aperiam dolorem mollitia? Quas tenetur id eligendi iusto fuga harum illo, eius, dolorum sit obcaecati dolore deserunt animi a atque, impedit natus dicta? Quaerat quod dolores molestias sint debitis, dicta nemo tempora vero ea rerum quasi, aliquid animi sit laudantium iusto praesentium nisi atque!</p>
                    </div>
                    <div className="space-y-33 mt-10">
                        <div className="flex items-center gap-3 bg-indigo-800 rounded-xl p-3 relative">
                            <Image width={100} height={100} src={defaultAvatar} alt="" className="w-[5rem] h-[5rem] rounded-full" />
                            <div>
                                <h1 className="text-3xl font-bold">Otsikko</h1>
                                <p>Kirjoittanut Testaaja</p>
                            </div>
                        </div>
                        <div>
                            <h1 className="mb-5 text-2xl">Jätä Kommentit</h1>
                            <div className='space-y-5 relative'>
                                <div className='flex flex-col items-start gap-2'>
                                    <label htmlFor="">Koko Nimi</label>
                                    <input className='border-3 border-[#e1d1ff7a] p-2 rounded-lg w-full' type="text" placeholder="Sinun nimesi" />
                                </div>
                                <div className='flex flex-col items-start gap-2'>
                                    <label htmlFor="">Kommentit</label>
                                    <textarea className='border-3 border-[#e1d1ff7a] p-2 rounded-lg w-full' type="text" placeholder="Kommentit" />
                                </div>
                                <div>
                                    <button className="hidden lg:flex bg-gradient-to-r from-indigo-500 to-pink-500 cursor-pointer text-[15px] font-bold px-6 py-3 rounded-full border-0 me-3">Lähetä Kommentit <i className="fas fa-paper-plane ms-1"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className='mt-10'>
                            <h1 className='text-2xl mb-5'>{comments?.length} Kommenttia</h1>
                            <div className='space-y-6'>
                                {comments?.map((comment, index) => (
                                    <div className='bg-[#07050D] border border-[#110c1f] p-5 rounded-xl' key={comment?.id}>
                                        <div className='flex items-center gap-3'>
                                            <Image width={100} height={100} src={comment?.profile.image} alt='' className='w-[2rem] h-[2rem] rounded-full' />
                                            <div>
                                                <h1 className='text-lg font-bold'>{comment?.profile.full_name}</h1>
                                                <p className='text-xs'>{formatDate(comment?.date_created)}</p>
                                            </div>
                                        </div>
                                        <p className='text-sm mt-3 text-gray-500'>{comment?.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Category />
            </div>
        </section>
        <Footer />
    </div>
  )
}
