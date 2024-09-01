import NewProjButton from "@/components/new-project-button";
import { db } from "@/db";
import { projects } from "@/db/schema";
import React from "react";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import ProjectList from "./projects-list";
import { getSubscription } from "@/actions/userSubscription";

export default async function Page() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const isSubscribed = await getSubscription({ userId });
  const allProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId));

  return (
    <div>
      <div className="flex items-center justify-center gap-3">
        <h1 className="text-3xl font-bold text-center my-4">Your Projects</h1>
        <NewProjButton />
      </div>
      {<ProjectList projects={allProjects} isSubscribed={isSubscribed} />}
    </div>
  );
}
