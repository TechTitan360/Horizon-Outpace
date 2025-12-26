import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

//*************************get project*************************//
export const getAllProjects = async (userId: number) => {
    try {
        const result = await db.select().from(projects).where(eq(projects.createdBy, userId)).orderBy(desc(projects.createdAt));
        return { success: true, data: result };
    } catch (error) {
        console.error("Error fetching projects:", error);
        return { success: false, error: "Failed to fetch projects." };
    }
};

//*************************creating project*************************//
export const createProject = async (
    data: { title: string; description?: string; teamId?: number },
    userId: number
) => {
    try {
        const result = await db.insert(projects).values({
            title: data.title,
            description: data.description || null,
            teamId: data.teamId,
            createdBy: userId
        }).returning();
        return {
            success: true, data: result[0]
        };
    } catch (error) {
        console.error("Error creating project: ", error);
        return {
            success: false, error: "Failed to create project..."
        };
    }
};

//*************************get project by id*************************//
export const getProjectById = async (id: number, userId: number) => {
    try {
        const result = await db.select().from(projects).where(and(eq(projects.id, id), eq(projects.createdBy, userId)));
        if (result.length === 0) {
            return { success: false, error: "project not fount..!!" };
        }
        return { success: true, data: result[0] };
    } catch (error) {
        console.error("Error fetching project..!!", error);
        return {success: false, error: "Error fetching project..!!"};
    }
};

//*************************update project*************************//
export const updateProject = async (
    id: number,
    data: { title?: string; description?: string; isArchived?: boolean },
    userId: number
) => {
    try {
        const result = await db.update(projects).set({
            ...data, updatedAt: new Date()
        }).where(
            and(
                eq(projects.id, id),
                eq(projects.createdBy, userId)
            )
        ).returning();
        if (result.length === 0) {
            return { success: false, error: "project not found..!" };
        }
        return{ success: true, data: result[0]};
    } catch(error){
        console.error("Error updating project..!", error);
        return {success: false, error:"failed to update project..!" };
    }
};

//*************************delete project*************************//
export const deleteProject = async(
    id: number, userId: number
) =>{
    try {
        const result = await db.delete(projects).where(and(eq(projects.id, id),eq(projects.createdBy, userId))).returning();

        if(result.length === 0){
            return{ success: false, error: "Project not found..!"};
        }
        return {success: true, data: result[0]};
    } catch (error) {
        console.error("Error deleting project..!", error);
        return {success: false, error:"failed to delete project..!" };
    }
};