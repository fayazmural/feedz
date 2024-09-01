import { projects } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubscribeButton from "@/components/subscribe-btn";
import { yearlyPlanId } from "@/lib/payments";
import { Lock } from "lucide-react";

type Project = InferSelectModel<typeof projects>;

interface ProjectListProps {
  projects: Project[];
  isSubscribed: boolean;
}

const ProjectList = async ({ projects, isSubscribed }: ProjectListProps) => {
  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-3 m-5 p-4 gap-4">
        {projects.map((project) => (
          <li key={project.id}>
            <Card className="max-w-[350px] flex flex-col h-full">
              <CardHeader className="flex-1">
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={`/projects/${project.id}`}>
                  <Button>View Project</Button>
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}

        {!isSubscribed && (
          <Card className="max-w-[350px] flex flex-col h-full bg-gray-300">
            <CardHeader className="flex-1">
              <CardTitle className="flex flex-row text-sm md:text-lg items-center">
                <Lock className="h-4 w-4 md:h-8 md:w-8 mr-2" />
                <span>Upgrade to Premium</span>
              </CardTitle>
              <CardDescription className="mt-3">
                Unlock unlimited projects
              </CardDescription>
            </CardHeader>
            <div className="w-fit mx-auto mb-4">
              <SubscribeButton price={yearlyPlanId} />
            </div>
          </Card>
        )}
      </ul>
    </div>
  );
};

export default ProjectList;
