import Link from "next/link";

const AccessDeniedPage = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-2xl">Access Denied!</h1>
      <Link href="/" className="btn btn-primary">
        Home
      </Link>
    </div>
  );
};

export default AccessDeniedPage;
