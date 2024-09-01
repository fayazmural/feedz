"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { getSubscription } from "./userSubscription";
import { count, eq } from "drizzle-orm";

export async function createProject(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const data = Object.fromEntries(formData.entries());
  const project = {
    ...data,
    userId,
  };

  const subscribed = await getSubscription({ userId });
  if (!subscribed) {
    const existingProjectsCount = await db
      .select({
        count: count(projects.id),
      })
      .from(projects)
      .where(eq(projects.userId, userId));
    if (existingProjectsCount[0].count >= 3) {
      throw new Error(
        "You have reached the maximum limit of 3 projects. Upgrade your plan to create more projects."
      );
    }
  }

  try {
    const [newProject] = await db.insert(projects).values(project).returning({
      insertedId: projects.id,
    });
    return newProject;
  } catch (error) {
    throw new Error("Something went wrong. Please try again later.");
  }
}
