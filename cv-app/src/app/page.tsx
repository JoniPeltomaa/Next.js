import { ITemplate } from "@/interfaces";
import { getAllTemplates } from "@/server-actions/templates";
import Link from "next/link";

export default async function Home() {

  const response = await getAllTemplates()
  if(!response.success) {
    return <div>{response.message}</div>
  }

  const data = response.data

  return (
    <div className=" flex flex-col gap-5 items-start">
      <div>
        <h1 className="text-xl font-bold text-primary">Mallipohja</h1>
        <span className="text-gary-500 text-sm">Selaa Mallipohja kokoelmaa</span>
      </div>
      <div className="mt-5 grid grid-cols-5 gap-10">
        {data.map((template:ITemplate) => (
          <Link key={template._id} href={`/template/${template._id}`}>
            <div className="border border-gray-200 border-solid hover:border-gray-700">
              <img  src={template.thumbnail} alt="" className="w-full h-96" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
