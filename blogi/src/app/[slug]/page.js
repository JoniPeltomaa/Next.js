"use client"

import { useState, useEffect } from 'react'
import { Header, Footer, Category } from '../components'
import Image from 'next/image'
import { defaultArticle, defaultAvatar } from '../components/images'
import { formatDate } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'


export default function page() {

    const router = useRouter()
    const params = useParams()
    const slug = params.slug

    const { user, profile } = useAuth()

    const [article, setArticle] = useState([])
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [loading, setLoading] = useState(true)

    const [newComment, setNewComment] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const fetchArticleData = async () => {
        setLoading(false)

    const {data: articleData, error: articleError} = await supabase
        .from("article")
        .select(
            `
                id, title, content, thumbnail, date_created, views, read_time, slug,
                category: category_id(title),
                author: profile_id(id, full_name, image, job_title),
                comment(id, comment, date_created, profile: profile_id(full_name, image)),
                like(id, profile_id, date_created)
            `
        )
        .eq("slug", slug)
        .single()
        
        if (articleError) {
            toast.error("Blogi viestien hakeminen epäonnistuis")
            console.log("Blogi viestien hakeminen epäonnistuis: ", articleError)
            return
        }

        setArticle((prevArticle) => ({
            ...prevArticle,
            views: (prevArticle?.views || 0) + 1,
        }))

        const {error: updateError} = await supabase.from("article").update({views: articleData?.views + 1}).eq("id",articleData?.id)

        if (updateError) {
            console.log("Failed to update views: ", updateError)
        }

        setArticle(articleData)
        setComments(articleData?.comment)
        setLikes(articleData?.like)
        setLoading(false)
    }

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            toast.error("Comment is required")
            return
        }

        if (!user) {
            toast.error("Kirjaudu sisään lisätäksesi kommentin")
            return
        }

        setSubmitting(true)

        const {data, error} = await supabase
            .from("comment")
            .insert([
                {
                    article_id: article?.id,
                    profile_id: profile?.id,
                    comment: newComment,
                    date_created: new Date()
                }
            ])
            .select("id, comment, date_created, profile:profile_id(full_name, image)")
            .single()
        
        if (error) {
            toast.error("Ei onnistunut lisämään kommenttia")
            console.log("Comment insert error: ", error )
        }else {
            toast.success("Kommentti lisättiin onnistuneesti")
            setComments((prev) => [...prev, data])
            setNewComment("")
        }
        setSubmitting(false)
    }

    useEffect(() => {
        fetchArticleData()
    }, [])

  return (
    <div>
        <Header />
        <section className="lg:px-33 px-5 my-20 z-10 relative">
            <div className="relative w-full h-[30rem]"onClick={fetchArticleData}>
                <Image width={100} height={100} src={article?.thumbnail || defaultArticle} alt="" className=" w-full h-[30rem] object-cover absolute rounded-2xl" />
                <div className="w-full h-[30rem] absolute bg-[#000000c3] rounded-2xl" />
                <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center text-5xl font-semibold leading-[4rem] drop-shadow-lg">{article?.title}</h1>
            </div>

            <div className="flex items-center gap-3 mt-10">
                <button className="p-2 px-4 bg-indigo-800 rounded-lg"><i className="fas fa-thumbs-up"></i>{likes?.length || 0}</button>
                
                <button className="p-2 px-4 bg-indigo-800 rounded-lg"><i className="fas fa-bookmark"></i></button>
                
                <div className="p-2 px-4 bg-indigo-800 rounded-lg">
                    <i className="fas fa-eye me-1"></i>{article?.views} Nähnyt
                </div>
                
                <div className="p-2 px-4 bg-indigo-800 rounded-lg">
                    <i className="fas fa-clock me-1"></i>{article?.read_time} min luettu
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10 my-10">
                <div >
                    <div className="bg-[#07050dd3] p-4 rounded-3xl backdrop-blur-sm ">
                        <p className="mb-2">{article?.content}</p>
                    </div>    
                    <div className="space-y-33 mt-10">
                        <div className="flex items-center gap-3 bg-indigo-800 rounded-xl p-3 relative">
                            <Image width={100} height={100} src={article?.author?.image || defaultAvatar} alt="" className="w-[5rem] h-[5rem] rounded-full" />
                            <div>
                                <h1 className="text-3xl font-bold">{article?.author?.full_name}</h1>
                                <p>{article?.author?.job_title || "Kirjoittanut Testaaja"}</p>
                            </div>
                        </div>
                        <div>
                            <h1 className="mb-5 text-2xl">Jätä Kommentit</h1>
                            <div className='space-y-5 relative'>
                                <div className='flex flex-col items-start gap-2'>
                                    <label htmlFor="">Koko Nimi</label>
                                    <input className='border-3 border-[#e1d1ff7a] p-2 rounded-lg w-full' type="text" value={profile?.full_name || "Testaaja"} readOnly placeholder="Sinun nimesi" />
                                </div>
                                <div className='flex flex-col items-start gap-2'>
                                    <label htmlFor="">Kommentit</label>
                                    <textarea className='border-3 border-[#e1d1ff7a] p-2 rounded-lg w-full' type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Kommentit" />
                                </div>
                                <div>
                                    <button onClick={handleAddComment} className="lg:flex bg-gradient-to-r from-indigo-500 to-pink-500 cursor-pointer text-[15px] font-bold px-6 py-3 rounded-full border-0 me-3">
                                        {submitting ? (
                                            <>
                                                Lähettää... <i className="fas fa-spinner fa-spin ms-1"></i>
                                            </>
                                        ) : (
                                            <>
                                                Lähetä Kommentit <i className="fas fa-paper-plane ms-1"></i>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='mt-10'>
                            <h1 className='text-2xl mb-5'>{comments?.length} Kommenttia</h1>
                            <div className='space-y-6'>
                                {comments?.map((comment, index) => (
                                    <div className='bg-[#07050D] border border-[#110c1f] p-5 rounded-xl' key={comment?.id}>
                                        <div className='flex items-center gap-3'>
                                            <Image width={100} height={100} src={comment?.profile.image || defaultAvatar} alt='' className='w-[2rem] h-[2rem] rounded-full' />
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
