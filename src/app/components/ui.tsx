export function Btn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-4 py-2 bg-[#EB212E] text-white border border-black hover:bg-[#f24b55] transition"
    >
      {children}
    </button>
  );
}
