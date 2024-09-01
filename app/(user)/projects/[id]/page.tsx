import { db } from "@/db";
import { eq } from "drizzle-orm";
import { projects } from "@/db/schema";
import Link from "next/link";
import { Globe, ChevronLeft, Code, MessagesSquare } from "lucide-react";
import Table from "@/components/table";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  if (!id) return <div>Invalid Project Id</div>;
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, id),
    with: {
      feedbacks: true,
    },
  });

  return (
    <div>
      <div>
        <Link
          href="/dashboard"
          className="flex items-center text-slate-900 mb-5 w-fit"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span className="text-lg">Back to projects</span>
        </Link>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-3">{project?.name}</h1>
          <h2 className="text-xl mb-2">{project?.description}</h2>
        </div>
        <div className="flex flex-col">
          {project?.url ? (
            <Link
              href={project.url}
              target="_blank"
              className="underline text-slate-900 flex items-center"
            >
              <Globe className="h-5 w-5 mr-1" />
              <span className="text-lg">Visit site</span>
            </Link>
          ) : null}
          <Link
            href={`/projects/${id}/instructions`}
            className="underline text-slate-900 flex items-center mt-2"
          >
            <Code className="h-5 w-5 mr-1" />
            <span className="text-lg">Embed Code</span>
          </Link>
        </div>
      </div>
      {project?.feedbacks && project?.feedbacks.length > 0 ? (
        <Table data={project?.feedbacks || []} />
      ) : (
        <div className="flex flex-col justify-center items-center mt-10">
          <MessagesSquare className="h-16 w-16 text-slate-700 mb-4" />
          <p className="text-center text-xl font-semibold text-slate-700">
            No feedbacks yet!!
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
