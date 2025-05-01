import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1, "Name is required"),
                githubUrl: z.string().url("Must be a valid URL"),
                githubToken: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            console.log("input", input);
            console.log("Available Prisma models:", Object.keys(ctx.db));

            if (!ctx.db) {
                throw new Error("Database client is not initialized");
            }

            try {
                const project = await ctx.db.project.create({
                    data: {
                        name: input.name,
                        githubUrl: input.githubUrl,
                        userToProjects: {
                            create: {
                                userId: ctx.user.userId,
                            },
                        },
                    },
                });

                return project;
            } catch (error) {
                console.error("Project creation error:", error);
                throw error;
            }
        }),
});