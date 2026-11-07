export type Status = 'Submitted' | 'In Progress' | 'Resolved';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type Complaint = { id:string; title:string; description:string; category:string; location:string; priority:Priority; status:Status; student:string; createdAt:string; updatedAt:string; assignedTo:string; votes:number; image?:string; duplicateOf?:string };
