import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetQuizByIdQuery,
  useUpdateAnswerMutation,
  useUpdateQuestionMutation,
} from "../../redux/apis/strapi";
import {
  resetUIState,
  selectUI,
  updateUIState,
} from "../../redux/slices/uiSlice";

export function CloseQuizButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [updateQuestionStrapi, updateQuestionStrapiStatus] =
    useUpdateQuestionMutation();
  const [updateAnswerStrapi, updreduxAnswerapiStatus] =
    useUpdateAnswerMutation();
  const {
    selectedQuizId,
    activeQuestionId,
    activeAnswerId,
    activeQuestionIndex,
    activeAnswerIndex,
    hasActiveQuestionChanged,
    answers: inputAnswer,
    question: inputQuestion,
  } = useSelector(selectUI);
  const {
    data: quiz,
    error,
    isLoading,
  } = useGetQuizByIdQuery(
    { selectedQuizId: router.query.id },
    { skip: !router.query.id }
  );
  const question = quiz?.attributes.questions.data[activeQuestionIndex];

  const onCloseQuiz = async () => {
    if (quiz?.attributes.translate_to.data.id === "xxxx") {
      dispatch(updateUIState({ isQuizLanguageSelected: false }));
      return;
    }
    dispatch(resetUIState());
    await router.push("/student/quizzes");
  };

  return (
    <>
      <button
        onClick={onCloseQuiz}
        type="button"
        className=" inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save & Exit
      </button>
    </>
  );
}
