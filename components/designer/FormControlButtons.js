import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import {useRouter} from 'next/router';
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetQuizByIdQuery,
  useUpdateAnswerMutation,
  useUpdateQuestionMutation,
} from "../../redux/apis/strapi";
import {
  selectUI,
  updateHasActiveQuestionChanged,
  updateUIState,
} from "../../redux/slices/uiSlice";

export function FormControlButtons() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [initialRender, setInitialRender] = useState(true);
  const [lastIndexWarning, setLastIndexWarning] = useState(false);
  const [firstIndexWarning, setFirstIndexWarning] = useState(true);
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
  } = useGetQuizByIdQuery({ selectedQuizId: router.query.id }, { skip: !router.query.id });

  const question = quiz?.attributes.questions.data[activeQuestionIndex];
  const totalQuestions = quiz?.attributes.questions.data.length - 1;
  const answers = question?.attributes.answers.data;
  const { handleSubmit } = useFormContext();

  useEffect(() => {
    if (!quiz) {
      return;
    }

    if (totalQuestions === 0) {
      setLastIndexWarning(true);
      setFirstIndexWarning(true);
      return;
    }

    setLastIndexWarning(false);
    setFirstIndexWarning(false);

    if (activeQuestionIndex + 1 > totalQuestions) {
      setLastIndexWarning(true);
    }

    if (activeQuestionIndex - 1 < 0) {
      setFirstIndexWarning(true);
    }
  }, [activeQuestionIndex, selectedQuizId, quiz]);

  const loadQuestion = (questionIndex) => {
    if (!quiz) {
      return;
    }
    if (questionIndex + 1 > quiz.attributes.questions.data.length) {
      return;
    }
    if (questionIndex + 1 <= 0) {
      return;
    }

    dispatch(
      updateUIState({
        activeQuestionId: quiz.attributes.questions.data[questionIndex].id,
        activeQuestionIndex: questionIndex,
        activeAnswerId:
          quiz.attributes.questions.data[questionIndex].attributes.answers
            .data[0].id,
      })
    );
  };

  useEffect(() => {
    if (!quiz) {
      return;
    }
    if (initialRender) {
      loadQuestion(activeQuestionIndex);
      setInitialRender(false);
    }
  }, [quiz]);

  const handleOnClickNext = () => {
    loadQuestion(activeQuestionIndex + 1);
    if (hasActiveQuestionChanged) {
      dispatch(
        updateHasActiveQuestionChanged({ hasActiveQuestionChanged: false })
      );
    }
  };

  const handleOnClickPrevious = () => {
    loadQuestion(activeQuestionIndex - 1);
    if (hasActiveQuestionChanged) {
      dispatch(
        updateHasActiveQuestionChanged({ hasActiveQuestionChanged: false })
      );
    }
  };

  return (
    <div id={"form-control-buttons"}>
      <span className="isolate inline-flex rounded-md shadow-sm">
        <button
          onClick={() => loadQuestion(0)}
          type="button"
          className={`${
            firstIndexWarning
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white hover:bg-gray-50 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          } relative -ml-px inline-flex items-center rounded-l-md border-l border-t border-b border-gray-300 px-3 py-2  text-sm font-medium text-gray-700`}
        >
          <span className="sr-only">Next</span>
          <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          onClick={handleOnClickPrevious}
          type="button"
          className={`${
            firstIndexWarning
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white hover:bg-gray-50 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          } relative inline-flex items-center  border border-gray-300 px-3 py-2  text-sm font-medium text-gray-700`}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          onClick={handleOnClickNext}
          type="button"
          className={`${
            lastIndexWarning
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white hover:bg-gray-50 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          } relative -ml-px inline-flex items-center border border-gray-300 px-3 py-2  text-sm font-medium text-gray-700`}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          onClick={() => loadQuestion(totalQuestions)}
          type="button"
          className={`${
            lastIndexWarning
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white hover:bg-gray-50 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          } relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 px-3 py-2  text-sm font-medium text-gray-700`}
        >
          <span className="sr-only">Next</span>
          <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </span>
    </div>
  );
}
