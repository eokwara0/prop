export default function Modal({
  firstMessage,
  secondMessage,
}: {
  firstMessage: string;
  secondMessage: string;
}) {
  return (
    <>
      <div className="px-4 py-2 w-full flex gap-2 justify-start items-start text-left ">
        <p className="text-xs font-medium  text-left">{firstMessage}</p>
        <span className="font-extralight text-xs text-left">
          {secondMessage}
        </span>
      </div>
    </>
  );
}
