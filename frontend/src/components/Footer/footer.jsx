export default function Footer() {
  return (
    <footer className="bg-gray-900 px-6 md:px-16 py-12 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-blue-500 w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">C</span>
            </div>
            <span className="text-xl font-bold">ChatApp</span>
          </div>
          <p className="text-gray-400">
            Connecting people through innovative communication solutions since
            2025.
          </p>
        </div>

        {["Product", "Company", "Resources"].map((category, index) => (
          <div key={index}>
            <h3 className="font-bold text-lg mb-4">{category}</h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "Support", "FAQ"].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 mb-4 md:mb-0">
          © 2025 ChatApp. All rights reserved.
        </p>
        <div className="flex space-x-6">
          {["Twitter", "Facebook", "Instagram", "LinkedIn"].map(
            (social, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {social}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
