import {useRouter} from 'next/router';
import React, { useEffect, useState } from "react";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import {
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  useAddBlankQuestionMutation,
  useDeleteAnswerMutation,
  useDeleteQuestionMutation,
  useGetQuizByIdQuery,
} from "../../redux/apis/strapi";
import { useDispatch, useSelector } from "react-redux";
import { selectUI, updateUIState } from "../../redux/slices/uiSlice";

function AddNewQuestionButton(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [addNewQuiz, setAddNewQuiz] = useState(false);
  const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
  const [response, setResponse] = useState(null);
  const [deleteQuestionStrapi, deleteQuestionStrapiStatus] =
    useDeleteQuestionMutation();
  const [deleteAnswerStrapi, deleteAnswerStrapiStatus] =
    useDeleteAnswerMutation();
  const {
    selectedQuizId,
    answers,
    activeQuestionId,
    activeAnswerId,
    activeQuestionIndex,
  } = useSelector(selectUI);

  const { data: quiz } = useGetQuizByIdQuery(
    { selectedQuizId: router.query.id },
    { skip: !router.query.id }
  );

  const getActiveQuestionIndex = () => {
    const questionsArray = quiz.attributes.questions.data;
    const totalNoQuestions = questionsArray.length - 1;
    if (activeQuestionIndex > totalNoQuestions) {
      return totalNoQuestions;
    }
    return activeQuestionIndex;
  };

  useEffect(() => {
    if (!isQuestionDeleted) {
      return;
    }
    const questionIndex = getActiveQuestionIndex();

    dispatch(
      updateUIState({
        activeQuestionId:
          quiz.attributes.questions.data[questionIndex].id,
        activeQuestionIndex: questionIndex,
        activeAnswerId:
          quiz.attributes.questions.data[questionIndex].attributes.answers
            .data[0].id,
      })
    );
    setIsQuestionDeleted(false);
  }, [quiz]);

  const handleClick = async () => {
    const payloadQuestion = {
      id: activeQuestionId,
    };
    await deleteQuestionStrapi(payloadQuestion);

    const payloadAnswer = {
      id: activeAnswerId,
    };
    setIsQuestionDeleted(true);
    await deleteAnswerStrapi(payloadAnswer);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <span className="">Delete Question</span>
    </button>
  );
}

export default AddNewQuestionButton;
