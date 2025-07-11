export default function SignUpProgress({ currentStep, totalSteps }) {
  return (
    <div className="flex justify-center space-x-2 mt-6">
      {[...Array(totalSteps)].map((_, i) => (
        <div
          key={i}
          className={`h-2 w-16 rounded-full ${
            currentStep >= i ? "bg-blue-500" : "bg-gray-600"
          }`}
        ></div>
      ))}
    </div>
  );
}
