import { useActionState } from "react";
import { isInRange, isNotEmpty } from "../utils/validation";
import { use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });
  const { addOpinion } = use(OpinionsContext);

  async function shareOpinionAction(_prevState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    const errors = [];

    if (!isNotEmpty(userName)) {
      errors.push("Please provide your name");
    }

    if (!isNotEmpty(title) || !isInRange(title, 5)) {
      errors.push("Title must be at least five characters long.");
    }

    if (!isNotEmpty(body) || !isInRange(body, 10)) {
      errors.push("Option must be between 10 and 300 characters long.");
    }

    if (errors.length) {
      return { errors, enteredValues: { userName, title, body } };
    }

    await addOpinion({
      title,
      body,
      userName,
    });

    return { errors: null };
  }

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
