"use client";
import { createProject } from "@/actions/createProject";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Plus } from "lucide-react";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const projectSchema = z.object({
  name: z.string().min(1, { message: "Project name is required" }),
  url: z.string().url({ message: "Invalid URL format" }),
  description: z
    .string()
    .max(500, { message: "Description too long" })
    .optional(),
});

const NewProjectButton = () => {
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const formData = new FormData(form as unknown as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const parseResult = projectSchema.safeParse(data);
    if (!parseResult.success) {
      setErrors(parseResult.error.format());
      setLoading(false);
      return;
    }

    setErrors({});
    try {
      const project = await createProject(formData);
      router.push(`/projects/${project?.insertedId}/instructions`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-1" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Create a new project to get started
          </DialogDescription>
        </DialogHeader>
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Project Name" />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name._errors[0]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" name="url" placeholder="https://example.com" />
              {errors.url && (
                <p className="text-red-500 text-sm">{errors.url._errors[0]}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              placeholder="Description (optional)"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description._errors[0]}
              </p>
            )}
          </div>
          {loading ? (
            <Button disabled className="w-full">
              <Loader size={16} className="animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Create Project
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectButton;
