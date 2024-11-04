import { Developer } from "./developer.model";

// src/app/models/project.model.ts
export interface Project {
    projectId: number;
    projectName: string;
    projectDescription: string;
    creationDate: string; // or Date, depending on your preference
    employees:Developer[];
  }
  