import AccountTitle from "./AccountTitle";
import Spinner from "./Spinner";

interface loadingSection {
  title: string;
}

function LoadingSection({ title }: loadingSection) {
  return (
    <div className="p-6 bg-light rounded-md flex flex-col gap-20 justify-center items-center pb-20">
      <AccountTitle>{title}</AccountTitle>
      <Spinner />
    </div>
  );
}

export default LoadingSection;
