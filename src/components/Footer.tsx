import Box from "@/components/Box";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <Box
      as="footer"
      id="footer"
      className="w-full border-t"
      style={{ background: "#1a0e08", borderColor: "#B8873A20" }}
    >
      {/* Top accent */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, #B8873A, #C53A24, #5A2C18)" }} />

      <Box className="flex flex-col md:flex-row w-full items-start md:items-center justify-between px-12 py-10 gap-6">

        {/* Left — brand */}
        <div className="flex flex-col gap-3">
          <h1
            className="text-2xl uppercase tracking-widest leading-none"
            style={{ color: "#D9B26A" }}
          >
            Name Generation
          </h1>
          <Separator style={{ background: "#B8873A30" }} />
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "#B8873A" }}>
            Pondok Modern Darussalam Gontor
          </p>
        </div>

        {/* Right — meta */}
        <div className="flex flex-col items-start md:items-end gap-1">
          <p className="text-xs" style={{ color: "#D9B26A" }}>
            Made with care by
          </p>
          <p className="text-sm font-medium" style={{ color: "#D9B26A80" }}>
            Siswa Akhir KMI 6101
          </p>
          <p className="text-xs mt-2" style={{ color: "#D9B26A" }}>
            &copy; 2025 All rights reserved.
          </p>
        </div>
      </Box>
    </Box>
  );
}