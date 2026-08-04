type IconName = "administrative" | "contracts" | "civil" | "public" | "compliance" | "defense" | "arrow" | "whatsapp" | "phone" | "mail" | "pin" | "clock" | "shield" | "check" | "menu" | "close";

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.65, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<IconName, React.ReactNode> = {
    administrative: <><path d="M3 21h18M5 18h14M6 9h12M4 9l8-5 8 5M8 9v9M12 9v9M16 9v9" /></>,
    contracts: <><path d="M8 3h8l3 3v15H5V3h3Z" /><path d="M14 3v5h5M8 12h8M8 16h6" /></>,
    civil: <><path d="M12 4v17M7 7h10M4 7l-3 6h6L4 7ZM20 7l-3 6h6l-3-6Z" /><path d="M3 13c0 2 2 3 4 0M17 13c0 2 2 3 4 0M8 21h8" /></>,
    public: <path d="M4 10h16M6 10v8M10 10v8M14 10v8M18 10v8M3 21h18M2 7l10-4 10 4H2Z" />,
    compliance: <><path d="M12 3 4 6v6c0 5 3 8 8 9 5-1 8-4 8-9V6l-8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    defense: <><path d="M12 3 4 6v6c0 5 3 8 8 9 5-1 8-4 8-9V6l-8-3Z" /><path d="M9 9.5a3.5 3.5 0 1 1 6 2.5c-1.8 1.5-3 2.2-3 4M12 18h.01" /></>,
    arrow: <path d="M5 12h14M14 6l6 6-6 6" />,
    whatsapp: <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.1Z" /><path d="M8.2 8.1c.4-1 1.1-.8 1.5-.1l.7 1.6c.2.5-.1.8-.5 1.2.8 1.7 2 2.8 3.7 3.5.4-.4.7-.9 1.2-.7l1.7.8c.6.3.7 1 .2 1.5-1.1 1.2-2.7 1.1-4.5.3-2.4-1-4.8-3.3-5.6-5.6-.4-1-.3-1.9.2-2.5" /></>,
    phone: <path d="M5 4h4l2 5-2.5 1.5a15 15 0 0 0 5 5L15 13l5 2v4c0 1.1-.9 2-2 2C9.7 21 3 14.3 3 6c0-1.1.9-2 2-2Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    shield: <><path d="M12 3 4 6v6c0 5 3 8 8 9 5-1 8-4 8-9V6l-8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };
  return <svg {...common}>{paths[name]}</svg>;
}
