type ActionButtonProps = {
  title: string;
  onClick: () => void;
};
function ActionButton({ title, onClick }: ActionButtonProps) {
  return (
    <button
      className="font-medium bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-xl"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default ActionButton;
