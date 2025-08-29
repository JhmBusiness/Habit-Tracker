interface formBtns {
  type: string;
  isSubmitting: boolean;
}

function FormBtns({ type, isSubmitting }: formBtns) {
  //   if (type === "delete")
  //   if (type === "manageFriends")
  if (type === "default")
    return (
      <div className="flex flex-col gap-4">
        <button
          type="submit"
          className="px-[18px] py-3 rounded-xl bg-add-green text-light w-fit font-semibold hover:scale-105 active:scale-95 duration-200 hover:cursor-pointer"
          disabled={isSubmitting}
        >
          {!isSubmitting ? "Save Changes" : "Saving..."}
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          className="px-[18px] py-3 rounded-xl border border-dark w-fit font-semibold hover:scale-105 active:scale-95 duration-200 hover:cursor-pointer"
        >
          Cancel
        </button>
      </div>
    );
}

export default FormBtns;
