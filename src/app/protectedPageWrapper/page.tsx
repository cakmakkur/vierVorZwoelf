import ProtectedPageSensitive from "../protectedPageSensitive/page";

export default function ProtectedPage() {
  return (
    <>
      <div>This is a protected text that should be seen:</div>
      <ProtectedPageSensitive />
    </>
  );
}
