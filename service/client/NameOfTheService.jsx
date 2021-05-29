import "./index.css";

const NameOfTheService = () => {
  const { useState } = React;
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="pt-50 mt-10">{count}</div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setCount(count + 1)}>
                Inc
              </button>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <p>A repo with tailwind and webpack and hooks setup for you to start hacking. Ekhdmou barka</p>
                  <ul className="list-disc space-y-2">
                    <li className="flex items-start">
                      <p className="ml-2">
                        Customizing your
                        <code className="text-sm font-bold text-gray-900">tailwind.config.js</code> file
                      </p>
                    </li>
                    <li className="flex items-start">
                      <p className="ml-2">
                        Extracting classes with
                        <code className="text-sm font-bold text-gray-900">@apply</code>
                      </p>
                    </li>
                    <li className="flex items-start">
                      <p className="ml-2">Code completion with instant preview</p>
                    </li>
                  </ul>
                  <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameOfTheService;
