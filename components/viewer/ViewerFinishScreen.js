import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import * as PropTypes from "prop-types";
import { Fragment } from "react";

function KPI({ title, value }) {
  return (
    <div
      className={
        "bg-blue-100  w-[150px] h-[150px] text-blue-700  rounded-full flex flex-col items-center justify-center"
      }
    >
      <div className={"text-4xl"}>{value}</div>
      <div className={"font-light text-xl"}>{title}</div>
    </div>
  );
}

KPI.propTypes = {
  incorrectAnswers: PropTypes.any,
  totalQuestions: PropTypes.any,
};
export default function ViewerFinishScreen({
  results,
  questions,
  setOpen,
  open,
}) {
  const incorrectAnswers = results?.data?.attributes.incorrectCount;
  const totalQuestions = results?.data?.attributes.totalQuestionsCount;
  const score = results?.data?.attributes.score;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity" />
        </Transition.Child>

        <div className="fixed top-[10%] left-0 right-0 z-10 overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="border-4 border-gray-300 relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <div>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-10 w-10 text-green-600 stroke-[2px]"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-4xl font-medium leading-6 text-gray-900"
                    >
                      Quiz Completed
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-xl text-gray-500">Results Breakdown</p>
                      <div
                        className={
                          "text-2xl text-gray-500 flex justify-center gap-4 my-10"
                        }
                      >
                        <KPI
                          title="Score"
                          value={` ${Math.round(score * 100)}%`}
                        />
                        <KPI title="Questions" value={totalQuestions} />{" "}
                        <KPI title="Incorrect" value={incorrectAnswers} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <Link href={"/student/quizzes"}>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-2xl"
                      onClick={() => setOpen(false)}
                    >
                      Go back
                    </button>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
