function ErrorMsg({ msg }: { msg: string }) {
  return (
    <p className="border-l-2 border-r-2 border-yellow-400 bg-gray-200 text-rose-500 text-center mx-4 py-1.5 px-2 max-w-[400px]">
      {msg}
    </p>
  );
}

export default ErrorMsg;
