"use client";

import Box from "@/components/Box";
import { Separator } from "@/components/ui/separator";
import { Phone, InstagramLogo, EnvelopeSimple } from "@phosphor-icons/react";

export default function Footer() {
  const socials = [
    {
      label: "Telepon",
      value: "0813 3738 221",
      href: "tel:+6208133738221",
      icon: <Phone size={14} />,
    },
    {
      label: "Instagram",
      value: "@impervious.generation",
      href: "https://instagram.com/impervious.generation",
      icon: <InstagramLogo size={14} />,
    },
    {
      label: "Email",
      value: "siswaakhir2027@gontor.ac.id",
      href: "mailto:siswaakhir2027@gontor.ac.id",
      icon: <EnvelopeSimple size={14} />,
    },
  ];

  return (
    <Box
      as="footer"
      id="footer"
      className="w-full border-t"
      style={{ background: "#1a0e08", borderColor: "#B8873A20" }}
    >
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, #B8873A, #C53A24, #5A2C18)" }}
      />

      <Box className="flex flex-col md:flex-row w-full items-start md:items-center justify-between px-12 py-10 gap-10">

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl uppercase tracking-widest leading-none" style={{ color: "#D9B26A" }}>
          Impervious Generation
          </h1>
          <Separator style={{ background: "#B8873A30" }} />
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "#B8873A" }}>
            Pondok Modern Darussalam Gontor
          </p>
        </div>
        {/**
         * <div className="flex flex-row items-center gap-4">
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "#B8873A50" }}>
            Hubungi Kami
          </p>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 group"
            >
              <span
                className="transition-colors duration-200"
                style={{ color: "#B8873A60" }}
              >
                {s.icon}
              </span>

              <div className="flex flex-col">
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "#B8873A50" }}
                >
                  {s.label}
                </span>

                <span
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#D9B26A70" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#D9B26A")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#D9B26A70")
                  }
                >
                  {s.value}
                </span>
              </div>
            </a>
          ))}
                  </div>

         */}
        
        <div className="flex flex-col items-start md:items-end gap-1">
          <p className="text-xs" style={{ color: "#D9B26A50" }}>Made with care by</p>
          <p className="text-sm font-medium" style={{ color: "#D9B26A80" }}>Siswa Akhir KMI 6101</p>
          <p className="text-xs mt-2" style={{ color: "#D9B26A40" }}>&copy; 2026 All rights reserved.</p>
        </div>
      </Box>
    </Box>
  );
}