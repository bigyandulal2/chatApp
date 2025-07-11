import { Link } from "react-router-dom";
export default function SignUpFooter() {
  return (
    <div className="text-center mt-8">
      <p className="text-gray-400">
        Already have an account?{" "}
        <Link
          to={"/signin"}
          className="text-blue-400 font-medium hover:underline"
          whileHover={{ scale: 1.05 }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
