export const Pagination = (): JSX.Element => {
  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white rounded-md shadow">
        <button
          className="px-4 py-3 text-indigo-500 outline-none appearance-none hover:text-indigo-600 focus:outline-none"
          type="button"
        >
          ankstenis
        </button>
        <button
          className="px-4 py-3 text-indigo-500 bg-gray-100 outline-none appearance-none hover:text-indigo-600 focus:outline-none"
          type="button"
        >
          1
        </button>
        <button
          className="px-4 py-3 text-indigo-500 outline-none appearance-none hover:text-indigo-600 focus:outline-none"
          type="button"
        >
          2
        </button>
        <button
          className="px-4 py-3 text-indigo-500 outline-none appearance-none hover:text-indigo-600 focus:outline-none"
          type="button"
        >
          3
        </button>
        <button
          className="px-4 py-3 text-indigo-500 outline-none appearance-none hover:text-indigo-600 focus:outline-none"
          type="button"
        >
          sekantis
        </button>
      </div>
    </div>
  );
};
