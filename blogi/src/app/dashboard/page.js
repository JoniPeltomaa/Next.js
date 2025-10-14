"use client"
import React from 'react'
import { Header, Footer } from '../components'
import { defaultArticle, defaultAvatar } from '../components/images'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function page() {
    const articles = [
    {
        title: "How to Write Engaging Blog Content",
        content: "In this guide, we break down actionable strategies for writing blog posts that capture attention...",
        thumbnail: defaultArticle,
        slug: "how-to-write-engaging-blog-content",
        views: 120,
        read_time: 5,
        category: { title: "Writing Tips", thumbnail: "/images/writing.jpg", slug: "writing-tips" },
        author: { full_name: "Jennifer Adga", image: defaultAvatar },
        date_created: "2025-03-22T13:45:00Z",
    },
    {
        title: "10 Best Productivity Tools for Remote Work",
        content: "Working remotely requires the right tools. Here are 10 apps that can help boost your productivity...",
        thumbnail: defaultArticle,
        slug: "best-productivity-tools-remote-work",
        views: 245,
        read_time: 6,
        category: { title: "Tech", thumbnail: "/images/tech.jpg", slug: "tech" },
        author: { full_name: "David Lin", image: defaultAvatar },
        date_created: "2025-03-22T13:45:00Z",
    },
    {
        title: "Mastering Minimalist Living",
        content: "Minimalism is more than just a trend — it’s a way of life. Learn how to embrace it step-by-step.",
        thumbnail: defaultArticle,
        slug: "mastering-minimalist-living",
        views: 310,
        read_time: 4,
        category: { title: "Lifestyle", thumbnail: "/images/lifestyle.jpg", slug: "lifestyle" },
        author: { full_name: "Amara Blake", image: defaultAvatar },
        date_created: "2025-03-22T13:45:00Z",
    },
    {
        title: "Exploring the Future of AI in Everyday Life",
        content: "AI is already transforming the way we live. Here's what to expect in the next 5 years.",
        thumbnail: defaultArticle,
        slug: "future-of-ai-everyday-life",
        views: 410,
        read_time: 7,
        category: { title: "Technology", thumbnail: "/images/ai.jpg", slug: "technology" },
        author: { full_name: "Ethan Zhao", image: defaultAvatar },
        date_created: "2025-03-22T13:45:00Z",
    },
    {
        title: "Simple Recipes for Busy Weeknights",
        content: "Short on time? These quick and easy meals will save your dinner routine.",
        thumbnail: defaultArticle,
        slug: "simple-weeknight-recipes",
        views: 190,
        read_time: 3,
        category: { title: "Food", thumbnail: "/images/food.jpg", slug: "food" },
        author: { full_name: "Nora Michaels", image: defaultAvatar },
        date_created: "2025-03-22T13:45:00Z",
    },
    {
        title: "Beginner’s Guide to Investing in Crypto",
        content: "Curious about cryptocurrency but don’t know where to start? This guide covers the basics.",
        thumbnail: defaultArticle,
        slug: "beginners-guide-crypto-investing",
        views: 270,
        read_time: 6,
        category: { title: "Finance", thumbnail: "/images/finance.jpg", slug: "finance" },
        author: { full_name: "Luis Fernando", image: defaultAvatar },
        date_created: "2025-03-22T13:45:00Z",
    },
    {
        title: "The Psychology Behind Great Branding",
        content: "Brands that stick in your mind aren't lucky — they're strategic. Here's why it works.",
        thumbnail: defaultArticle,
        slug: "psychology-of-great-branding",
        views: 330,
        read_time: 5,
        category: { title: "Marketing", thumbnail: "/images/marketing.jpg", slug: "marketing" },
        author: { full_name: "Claire Evans", image: defaultAvatar },
        date_created: "2025-03-22T13:45:00Z",
    },
    {
        title: "Remote Freelancing: Myths vs Reality",
        content: "Freelancing from home sounds amazing, but it’s not always as easy as it seems. Here's the truth.",
        thumbnail: defaultArticle,
        slug: "remote-freelancing-myths-vs-reality",
        views: 150,
        read_time: 4,
        category: { title: "Career", thumbnail: "/images/career.jpg", slug: "career" },
        author: { full_name: "Marcus Reed", image: defaultAvatar },
        date_created: "2025-03-22T13:45:00Z",
    }
    ];
    const notifications = [
        {
            id: 1,
            type: "Kommentti",
            message: "Jane Doe commented on your article 'Exploring the Future of Tech'.",
            is_read: false,
            article_id: 3,
            receiver_id: "user-uuid-123",
            sender_id: "user-uuid-456",
            date_created: "2025-03-21T12:34:56Z",
        },
        {
            id: 2,
            type: "Tykätty",
            message: "Michael Smith liked your article '10 Habits of Highly Effective People'.",
            is_read: false,
            article_id: 5,
            receiver_id: "user-uuid-123",
            sender_id: "user-uuid-789",
            date_created: "2025-03-21T15:22:40Z",
        },
        {
            id: 3,
            type: "Kommentti",
            message: "Emily Carter replied to your comment on 'The Rise of Remote Work Culture'.",
            is_read: false,
            article_id: 7,
            receiver_id: "user-uuid-123",
            sender_id: "user-uuid-321",
            date_created: "2025-03-22T08:17:23Z",
        },
    ];

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

    const stats = [
        { title: "Nähty", value: 51, icon: "fas fa-eye", bg: "bg-orange-200", text: "text-orange-600" },
        { title: "Postaukset", value: 3, icon: "fas fa-file", bg: "bg-blue-200", text: "text-blue-600" },
        { title: "Tykätty", value: 54, icon: "fas fa-heart", bg: "bg-red-200", text: "text-red-600" },
        { title: "Kommentit", value: 4, icon: "fas fa-comment", bg: "bg-purple-200", text: "text-purple-600" },
        { title: "Ilmoitukset", value: 5, icon: "fas fa-bell", bg: "bg-yellow-200", text: "text-yellow-600" },
    ];


  return (
    <div>
        <Header />
        <section className="lg:px-33 px-5 my-20 space-y-10 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {stats?.map((stat, index) => (
                    <div className="p-5 rounded-lg flex items-center gap-6 bg-[#07050D] border border-[#110c1f]">
                        <i className={`${stat.icon} text-3xl p-3 rounded-lg ${stat?.bg} ${stat?.text}`}></i>
                        <div>
                            <h2 className="text-3xl font-bold">{stat?.value}</h2>
                            <p className="text-md text-gray-300">{stat?.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="p-5 rounded-lg bg-[#07050D] border border-[#110c1f] space-y-8">
                    <div className="space-y-1 mb-10">
                        <h2 className="text-3xl font-bold">Blogi Postaukset</h2>
                        <p className="text-sm text-gary-300">Kaikki Postaukset</p>
                    </div>
                    <div className="overflow-y-scroll max-h-[40rem]">
                        {articles?.map((article, index) => (
                            <div className="border border-[#110c1f] py-5 me-2">
                                <div className="flex gap-4 items-center">
                                    <Image width={100} height={100} src={article?.thumbnail} className="w-20 h-20 object-cover rounded-md" alt={article?.title} />
                                    <div className="space-y-2">
                                        <p className="text-md">{article?.title}</p>
                                        <div className="flex gap-4">
                                            <p className="text-xs text-gray-500">
                                                <i className="fas fa-calendar me-1"></i> {formatDate(article?.date_created)}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                <i className="fas fa-eye me-1"></i> {article?.views}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                <i className="fas fa-thumbs-up me-1"></i> {5}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                <i className="fas fa-comment me-1"></i> {5}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 mt-3">
                                    <Link href="/" className="h-10 w-10 flex items-center justify-center bg-green-700 rounded-md">
                                        <i className="fas fa-eye"></i>
                                    </Link>
                                    <Link href="/" className="h-10 w-10 flex items-center justify-center bg-blue-700 rounded-md">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <button className="h-10 w-10 flex items-center justify-center bg-red-700 rounded-md">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-5 rounded-lg bg-[#07050D] border border-[#110c1f] space-y-8">
                    <div className="space-y-1 mb-10">
                        <h2 className="text-3xl font-bold">Kommentit</h2>
                        <p className="text-sm text-gary-300">Viimeisimmät Kommentit</p>
                    </div>
                    <div className="overflow-y-scroll max-h-[40rem]">
                        {comments?.map((comment, index) => (
                            <div className="flex gap-4 items-center border-b border-[#110c1f] py-5">
                                <Image width={100} height={100} src={comment.profile.image} className="w-10 h-10 object-cover rounded-full" alt="" />
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-200">{comment.comment}</p>
                                    <p className="text-sm text-gray-500">{comment.profile.full_name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-5 rounded-lg bg-[#07050D] border border-[#110c1f] space-y-8">
                    <div className="space-y-1 mb-10">
                        <h2 className="text-3xl font-bold">Ilmoitukset</h2>
                        <p className="text-sm text-gary-300">Lukematta Olevat Ilmoitukset</p>
                    </div>
                    <div className="overflow-y-scroll max-h-[40rem]">
                        {notifications?.map((notification, index) => (
                            <div className="flex items-center gap-6 border-b border-[#110c1f] py-5">
                                <i className={`fas ${notification?.type === "Kommentit" ? "fa-comment bg-purple-200 text-purple-600" : "fa-thumbs-up bg-blue-200 text-blue-600"} text-3xl p-3 rounded-lg`}></i>
                                <div className="space-x-2">
                                    <h2 className="text-2xl font-bold">{notification?.type?.charAt(0).toUpperCase() + notification.type.slice(1)}</h2>
                                    <p className="text-xs text-gray-500">{notification.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>
  )
}
