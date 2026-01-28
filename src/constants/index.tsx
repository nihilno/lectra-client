import { Subject } from "@/types";

export const DEPARTMENTS = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
];

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    code: "CS101",
    department: "Computer Science",
    description:
      "Fundamental concepts of computing, programming basics, and problem-solving techniques.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Calculus I",
    code: "MATH101",
    department: "Mathematics",
    description:
      "Limits, derivatives, and integrals of single-variable functions with applications.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Introduction to Electrical Engineering",
    code: "EE110",
    department: "Electrical Engineering",
    description:
      "Basic circuit theory, signals, and an overview of electrical systems and devices.",
    createdAt: new Date().toISOString(),
  },
];
