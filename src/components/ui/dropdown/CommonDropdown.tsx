import React, {useRef, useState, useEffect, ReactNode} from "react";

interface CommonDropdownProps {
  renderButton: (props: { onClick: () => void; open: boolean }) => React.ReactElement;
  children: ReactNode;
  dropdownClassName?: string;
  align?: "left" | "right";
  offsetY?: number;
}

export default function CommonDropdown({
  renderButton,
  children,
  dropdownClassName = "",
  align = "left",
  offsetY = 8,
}: CommonDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫힘 처리
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // 드롭다운 위치 스타일
  const dropdownPosition =
    align === "right"
      ? "absolute right-0"
      : "absolute left-0";

  return (
    <div className="relative" ref={dropdownRef}>
      {renderButton({ onClick: () => setOpen((v) => !v), open })}
      {open && (
        <div
          className={`z-50 bg-white rounded-lg animate-fade-in ${dropdownPosition} ${dropdownClassName}`}
          style={{ marginTop: offsetY, boxShadow: "0 4px 16px 0 rgba(0,0,0,0.10), 0 -4px 16px 0 rgba(0,0,0,0.10)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
