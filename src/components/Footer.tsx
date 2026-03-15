import Box from "@/components/Box"
import { Separator } from "@/components/ui/separator"


export default function Footer() {
    return (
        <>
        <Box as="section" id="footer" className="bg-primary-foreground">
            <Box className="flex flex-row w-full h-full">
                <Box className="flex flex-col w-max h-full p-5 gap-2">
                    <h1 className="font-bold text-xl uppercase tracking-tighter">Name Generation</h1>
                    <Separator/>
                    <p className="text-sm">Copyright 2025 &copy; Pondok Modern Darussalam Gontor.</p>
                    <p className="text-sm text-muted-foreground">Made by Siswa Akhir KMI 6101.</p>
                </Box>
            </Box>
        </Box>
        </>
    );
}