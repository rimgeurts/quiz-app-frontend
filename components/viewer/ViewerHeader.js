import React from "react";
import * as PropTypes from "prop-types";
import {XCircleIcon} from "@heroicons/react/24/outline";

export function ViewerHeader(props) {
  return (
    <div
      className={
        "flex justify-between border-b-2 border-dashed border-gray-200"
      }
    >
      <div
        className={`sm:px-0 sm:py-3 px-3 py-1 rounded-md  sm:text-2xl text-lg  text-gray-800  `}
      >
        {/*Score:{" 100%"}*/}
        Question: {props.currentQuestionNo} / {props.totalQuestions}
      </div>

    </div>
  );
}

ViewerHeader.propTypes = {
  currentQuestionNo: PropTypes.any,
  totalQuestions: PropTypes.any,
};
