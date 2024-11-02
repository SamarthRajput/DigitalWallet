export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-4 bg-white rounded-xl bg-[#ededed]">
      <h1 className="text-xl border-p pb-2">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
