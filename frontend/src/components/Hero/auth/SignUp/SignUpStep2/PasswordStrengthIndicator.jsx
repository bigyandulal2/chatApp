export default function PasswordStrengthIndicator({ strength }) {
  return (
    <div className="mt-3 mb-6 text-white">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-200">Password strength</span>
        <span className="text-xs font-medium">
          {strength === 0 && "Weak"}
          {strength === 1 && "Fair"}
          {strength === 2 && "Good"}
          {strength === 3 && "Strong"}
          {strength === 4 && "Very Strong"}
        </span>
      </div>
      <div className="w-full h-1.5 bg-gray-600 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            strength === 0
              ? "w-0"
              : strength === 1
              ? "w-1/4 bg-red-500"
              : strength === 2
              ? "w-2/4 bg-yellow-500"
              : strength === 3
              ? "w-3/4 bg-blue-500"
              : "w-full bg-green-500"
          }`}
        ></div>
      </div>
    </div>
  );
}
