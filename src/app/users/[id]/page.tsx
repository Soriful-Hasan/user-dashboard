import UserDetails from "./userDetails";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserPage({ params }: PageProps) {
  const { id } = await params; // unwrap params
  return (
    <div className="bg-gray-100 min-h-screen">
      <UserDetails id={id} />
    </div>
  );
}
