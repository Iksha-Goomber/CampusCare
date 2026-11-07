import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'CampusCare | Campus issue management',description:'A smarter way to report, manage and resolve campus maintenance issues.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
